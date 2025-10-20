import connectDB from "@/lib/config/db";
import Listing from "@/model/listing";
import Vendor from "@/model/vendor";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

// GET all services/listings for the explore services page (service-first approach)
export async function GET(req: NextRequest) {
  await connectDB();

  try {
    // Find all vendors that are verified
    const vendors = await Vendor.find({ isVerified: true });
    
    if (!vendors || vendors.length === 0) {
      return NextResponse.json({ 
        message: "No verified vendors found",
        services: [],
        vendorServices: [] // Keep for backward compatibility
      }, { status: 200 });
    }

    // Fetch Clerk user data for all vendors to get their profile images
    const clerkUserPromises = vendors.map(async (vendor) => {
      try {
        const client = await clerkClient();
        const clerkUser = await client.users.getUser(vendor.clerkId);
        return {
          clerkId: vendor.clerkId,
          imageUrl: clerkUser.imageUrl
        };
      } catch (error) {
        console.error(`Failed to fetch Clerk user for ${vendor.clerkId}:`, error);
        return {
          clerkId: vendor.clerkId,
          imageUrl: null
        };
      }
    });

    const clerkUsers = await Promise.all(clerkUserPromises);
    const clerkUserMap = new Map(clerkUsers.map(u => [u.clerkId, u.imageUrl]));

    // Create a map of vendors for quick lookup
    const vendorMap = new Map(
      vendors.map(vendor => {
        const clerkImageUrl = clerkUserMap.get(vendor.clerkId);
        return [
          vendor._id.toString(),
          {
            id: vendor._id.toString(),
            name: vendor.service_name || vendor.ownerName,
            rating: 4.5, // Default rating
            reviewsCount: 0, // Default count
            image: clerkImageUrl || vendor.ownerImage || "/placeholder.svg?height=200&width=300&text=Vendor",
            location: vendor.service_address?.City || vendor.owner_address?.City || "Location not specified",
            experience: "Established: " + (vendor.establishedYear || "N/A"),
            description: vendor.service_description || "No description available",
            verified: vendor.isVerified
          }
        ];
      })
    );

    // Get all vendor IDs
    const vendorIds = vendors.map(vendor => vendor._id);
    
    // Find all active listings owned by verified vendors
    const listings = await Listing.find({ 
      owner: { $in: vendorIds },
      isActive: true
    });

    // Transform listings into service-first format
    const services = listings.map(listing => {
      const vendor = vendorMap.get(listing.owner.toString());
      
      return {
        id: listing._id.toString(),
        name: listing.title,
        price: listing.price,
        category: listing.features[0] || "Other",
        description: listing.description,
        images: listing.images || [],
        featured: false, // Can be extended based on listing properties
        vendor: vendor || {
          id: listing.owner.toString(),
          name: "Unknown Vendor",
          rating: 0,
          reviewsCount: 0,
          image: "/placeholder.svg?height=200&width=300&text=Vendor",
          location: "Location not specified",
          verified: false
        }
      };
    });

    // Also create the old vendor-grouped format for backward compatibility
    const vendorServices = vendors.map(vendor => {
      const vendorListings = listings.filter(listing => 
        listing.owner.toString() === vendor._id.toString()
      );

      const vendorServicesList = vendorListings.map(listing => ({
        id: listing._id.toString(),
        name: listing.title,
        price: listing.price,
        category: listing.features[0] || "Other",
        description: listing.description,
        startingPrice: `₹${listing.price.toLocaleString('en-IN')}`
      }));

      const clerkImageUrl = clerkUserMap.get(vendor.clerkId);

      return {
        id: vendor._id.toString(),
        name: vendor.service_name || vendor.ownerName,
        rating: 4.5,
        reviewsCount: 0,
        image: clerkImageUrl || vendor.ownerImage || "/placeholder.svg?height=200&width=300&text=Vendor",
        location: vendor.service_address?.City || vendor.owner_address?.City || "Location not specified",
        experience: "Established: " + (vendor.establishedYear || "N/A"),
        description: vendor.service_description || "No description available",
        featured: false,
        verified: vendor.isVerified,
        services: vendorServicesList
      };
    });

    return NextResponse.json({ 
      services, // New service-first format
      vendorServices // Old format for backward compatibility
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching vendor services:", error);
    return NextResponse.json({ 
      message: "Failed to fetch vendor services", 
      error: String(error),
      services: [],
      vendorServices: []
    }, { status: 500 });
  }
}
