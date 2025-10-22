import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import Vendor from '@/model/vendor';
import connectDB from '@/lib/config/db';

export async function POST(req: NextRequest) {
  try {
    // Get authenticated user
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();
    const {
      businessName,
      ownerName,
      email,
      phone,
      category,
      description,
      experience,
      location,
      state,
      area,
      address,
      website,
      instagram,
      facebook,
      services,
      priceRange,
      gstNumber,
      panNumber,
      aadharNumber,
      bankName,
      accountNumber,
      ifscCode,
      accountHolderName
    } = body;

    // Validate required fields
    if (!businessName || !ownerName || !email || !phone || !category || !description || !area || !address || !priceRange) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Check if vendor already exists
    let vendor = await Vendor.findOne({ clerkId: userId });
    
    if (vendor) {
      // Update existing vendor
      vendor.ownerName = ownerName;
      vendor.ownerEmail = email;
      vendor.owner_contactNo = [phone];
      vendor.service_name = businessName;
      vendor.service_email = email;
      vendor.service_phone = phone;
      vendor.service_address = {
        City: area,
        State: state,
        location: address,
        pinCode: ""
      };
      vendor.service_description = description;
      vendor.establishedYear = experience || "";
      vendor.service_type = category;
      vendor.gstNumber = gstNumber || "";
      vendor.panNumber = panNumber || "";
      vendor.ownerAadhar = aadharNumber?.replace(/\s/g, '') || "";
      vendor.bankName = bankName || "";
      vendor.accountNumber = accountNumber || "";
      vendor.ifscCode = ifscCode || "";
      vendor.accountHolderName = accountHolderName || "";
      vendor.owner_address = {
        City: area,
        State: state,
        location: address,
        pinCode: ""
      };
      vendor.isVerified = true; // Auto-verify for now
      vendor.updatedAt = new Date();
    } else {
      // Create new vendor
      vendor = new Vendor({
        clerkId: userId,
        ownerName,
        ownerEmail: email,
        owner_contactNo: [phone],
        service_name: businessName,
        service_email: email,
        service_phone: phone,
        service_address: {
          City: area,
          State: state,
          location: address,
          pinCode: ""
        },
        service_description: description,
        establishedYear: experience || "",
        service_type: category,
        gstNumber: gstNumber || "",
        panNumber: panNumber || "",
        ownerAadhar: aadharNumber?.replace(/\s/g, '') || "",
        bankName: bankName || "",
        accountNumber: accountNumber || "",
        ifscCode: ifscCode || "",
        accountHolderName: accountHolderName || "",
        owner_address: {
          City: area,
          State: state,
          location: address,
          pinCode: ""
        },
        isVerified: true, // Auto-verify for now
        listings: [],
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await vendor.save();

    // Update Clerk user metadata to reflect vendor role
    try {
      const client = await clerkClient();
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          role: 'vendor',
          vendorId: vendor._id.toString()
        },
        unsafeMetadata: {
          role: 'vendor',
          vendorId: vendor._id.toString()
        }
      });
    } catch (clerkError) {
      console.error('Error updating Clerk metadata:', clerkError);
      // Don't fail the request if Clerk update fails
    }

    return NextResponse.json({ 
      success: true, 
      vendor: {
        id: vendor._id.toString(),
        businessName: vendor.service_name,
        isVerified: vendor.isVerified
      },
      message: "Vendor application submitted successfully! You are now a vendor."
    }, { status: 200 });

  } catch (error) {
    console.error('[VENDOR_APPLICATION_ERROR]', error);
    return NextResponse.json({ 
      error: 'Failed to submit vendor application. Please try again.' 
    }, { status: 500 });
  }
}
