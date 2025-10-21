"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Building, Mail, Phone, MapPin, Calendar, FileText, CreditCard, CheckCircle } from "lucide-react"

// Common service categories
const SERVICE_CATEGORIES = [
  "Photography",
  "Videography",
  "Catering",
  "Decoration",
  "Music & DJ",
  "Venue",
  "Makeup & Hair",
  "Wedding Planning",
  "Transportation",
  "Invitations",
  "Entertainment",
  "Other"
]

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
]

export default function BecomeVendorPage() {
  const router = useRouter()
  const { isSignedIn, isLoaded } = useAuth()
  const { user } = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const [formData, setFormData] = useState({
    // Owner Information
    ownerName: "",
    ownerEmail: "",
    owner_contactNo: "",
    ownerAadhar: "",
    owner_address: {
      State: "",
      City: "",
      location: "",
      pinCode: ""
    },
    // Business Information
    service_name: "",
    service_email: "",
    service_phone: "",
    service_type: "",
    service_description: "",
    establishedYear: "",
    service_address: {
      State: "",
      City: "",
      location: "",
      pinCode: ""
    },
    gstNumber: "",
    panNumber: "",
    // Bank Details
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: ""
  })

  // Check authentication before showing the page
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in?redirect=/become-vendor")
    }
  }, [isSignedIn, isLoaded, router])

  // Pre-fill owner information from Clerk
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        ownerName: user.fullName || "",
        ownerEmail: user.primaryEmailAddress?.emailAddress || ""
      }))
    }
  }, [user])

  // Show loading while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Show nothing if not authenticated (will redirect)
  if (!isSignedIn) {
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (!formData.ownerName || !formData.ownerEmail || !formData.owner_contactNo) {
          toast.error("Please fill in all required owner information fields")
          return false
        }
        if (!/^[6-9]\d{9}$/.test(formData.owner_contactNo)) {
          toast.error("Please enter a valid 10-digit mobile number")
          return false
        }
        if (!/^\S+@\S+\.\S+$/.test(formData.ownerEmail)) {
          toast.error("Please enter a valid email address")
          return false
        }
        return true
      case 2:
        if (!formData.service_name || !formData.service_type || !formData.service_phone || !formData.service_description) {
          toast.error("Please fill in all required business information fields")
          return false
        }
        if (!/^[6-9]\d{9}$/.test(formData.service_phone)) {
          toast.error("Please enter a valid 10-digit business phone number")
          return false
        }
        return true
      case 3:
        if (!formData.bankName || !formData.accountNumber || !formData.ifscCode || !formData.accountHolderName) {
          toast.error("Please fill in all required bank details")
          return false
        }
        if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode.toUpperCase())) {
          toast.error("Please enter a valid IFSC code")
          return false
        }
        return true
      default:
        return true
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateStep(currentStep)) {
      return
    }

    setIsSubmitting(true)
    try {
      // Create vendor in database
      const response = await fetch(`/api/vendor/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          clerkId: user?.id,
          ownerName: formData.ownerName,
          ownerEmail: formData.ownerEmail,
          owner_contactNo: [formData.owner_contactNo],
          ownerAadhar: formData.ownerAadhar,
          owner_address: formData.owner_address,
          service_name: formData.service_name,
          service_email: formData.service_email || formData.ownerEmail,
          service_phone: formData.service_phone,
          service_type: formData.service_type,
          service_description: formData.service_description,
          establishedYear: formData.establishedYear,
          service_address: formData.service_address,
          gstNumber: formData.gstNumber,
          panNumber: formData.panNumber,
          bankName: formData.bankName,
          accountNumber: formData.accountNumber,
          ifscCode: formData.ifscCode.toUpperCase(),
          accountHolderName: formData.accountHolderName,
          isVerified: false,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      })

      if (!response.ok) {
        throw new Error("Failed to create vendor profile")
      }

      // Update user role in Clerk
      await user?.update({
        unsafeMetadata: {
          role: "vendor"
        }
      })

      toast.success("Vendor registration successful! Redirecting to your dashboard...")
      
      // Redirect to vendor dashboard after a brief delay
      setTimeout(() => {
        router.push("/vendor-dashboard")
      }, 2000)

    } catch (error) {
      console.error("Error creating vendor profile:", error)
      toast.error("Failed to create vendor profile. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Become a Vendor
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join our platform and grow your business with Bliss Vendors
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step
                    ? "bg-pink-600 border-pink-600 text-white"
                    : "border-gray-300 text-gray-300"
                }`}>
                  {currentStep > step ? <CheckCircle className="w-6 h-6" /> : step}
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    currentStep > step ? "bg-pink-600" : "bg-gray-300"
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-600 dark:text-gray-400">Owner Info</span>
            <span className="text-xs text-gray-600 dark:text-gray-400">Business Info</span>
            <span className="text-xs text-gray-600 dark:text-gray-400">Bank Details</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && "Owner Information"}
                {currentStep === 2 && "Business Information"}
                {currentStep === 3 && "Bank Details"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Provide your personal information"}
                {currentStep === 2 && "Tell us about your business"}
                {currentStep === 3 && "Add your bank account details for payments"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Owner Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ownerName">Owner Name *</Label>
                      <Input
                        id="ownerName"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="ownerEmail">Email *</Label>
                      <Input
                        id="ownerEmail"
                        name="ownerEmail"
                        type="email"
                        value={formData.ownerEmail}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="owner_contactNo">Contact Number *</Label>
                      <Input
                        id="owner_contactNo"
                        name="owner_contactNo"
                        value={formData.owner_contactNo}
                        onChange={handleInputChange}
                        placeholder="10-digit mobile number"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="ownerAadhar">Aadhar Number (Optional)</Label>
                      <Input
                        id="ownerAadhar"
                        name="ownerAadhar"
                        value={formData.ownerAadhar}
                        onChange={handleInputChange}
                        placeholder="12-digit Aadhar number"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Owner Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="owner_address.State">State</Label>
                        <Select
                          value={formData.owner_address.State}
                          onValueChange={(value) => handleSelectChange("owner_address.State", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent>
                            {INDIAN_STATES.map(state => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="owner_address.City">City</Label>
                        <Input
                          id="owner_address.City"
                          name="owner_address.City"
                          value={formData.owner_address.City}
                          onChange={handleInputChange}
                          placeholder="City"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="owner_address.location">Location/Area</Label>
                        <Input
                          id="owner_address.location"
                          name="owner_address.location"
                          value={formData.owner_address.location}
                          onChange={handleInputChange}
                          placeholder="Street address"
                        />
                      </div>
                      <div>
                        <Label htmlFor="owner_address.pinCode">PIN Code</Label>
                        <Input
                          id="owner_address.pinCode"
                          name="owner_address.pinCode"
                          value={formData.owner_address.pinCode}
                          onChange={handleInputChange}
                          placeholder="6-digit PIN"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Business Information */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="service_name">Business Name *</Label>
                      <Input
                        id="service_name"
                        name="service_name"
                        value={formData.service_name}
                        onChange={handleInputChange}
                        placeholder="Your business name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="service_type">Service Category *</Label>
                      <Select
                        value={formData.service_type}
                        onValueChange={(value) => handleSelectChange("service_type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {SERVICE_CATEGORIES.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="service_phone">Business Phone *</Label>
                      <Input
                        id="service_phone"
                        name="service_phone"
                        value={formData.service_phone}
                        onChange={handleInputChange}
                        placeholder="10-digit phone number"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="service_email">Business Email</Label>
                      <Input
                        id="service_email"
                        name="service_email"
                        type="email"
                        value={formData.service_email}
                        onChange={handleInputChange}
                        placeholder="business@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="establishedYear">Established Year</Label>
                      <Input
                        id="establishedYear"
                        name="establishedYear"
                        value={formData.establishedYear}
                        onChange={handleInputChange}
                        placeholder="YYYY"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                      <Input
                        id="gstNumber"
                        name="gstNumber"
                        value={formData.gstNumber}
                        onChange={handleInputChange}
                        placeholder="GST Number"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="panNumber">PAN Number (Optional)</Label>
                    <Input
                      id="panNumber"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleInputChange}
                      placeholder="PAN Number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="service_description">Business Description *</Label>
                    <Textarea
                      id="service_description"
                      name="service_description"
                      value={formData.service_description}
                      onChange={handleInputChange}
                      placeholder="Describe your services..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Business Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="service_address.State">State</Label>
                        <Select
                          value={formData.service_address.State}
                          onValueChange={(value) => handleSelectChange("service_address.State", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent>
                            {INDIAN_STATES.map(state => (
                              <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="service_address.City">City</Label>
                        <Input
                          id="service_address.City"
                          name="service_address.City"
                          value={formData.service_address.City}
                          onChange={handleInputChange}
                          placeholder="City"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="service_address.location">Location/Area</Label>
                        <Input
                          id="service_address.location"
                          name="service_address.location"
                          value={formData.service_address.location}
                          onChange={handleInputChange}
                          placeholder="Street address"
                        />
                      </div>
                      <div>
                        <Label htmlFor="service_address.pinCode">PIN Code</Label>
                        <Input
                          id="service_address.pinCode"
                          name="service_address.pinCode"
                          value={formData.service_address.pinCode}
                          onChange={handleInputChange}
                          placeholder="6-digit PIN"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Bank Details */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bankName">Bank Name *</Label>
                      <Input
                        id="bankName"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleInputChange}
                        placeholder="Bank name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="accountHolderName">Account Holder Name *</Label>
                      <Input
                        id="accountHolderName"
                        name="accountHolderName"
                        value={formData.accountHolderName}
                        onChange={handleInputChange}
                        placeholder="Account holder name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="accountNumber">Account Number *</Label>
                      <Input
                        id="accountNumber"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        placeholder="Account number"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="ifscCode">IFSC Code *</Label>
                      <Input
                        id="ifscCode"
                        name="ifscCode"
                        value={formData.ifscCode}
                        onChange={handleInputChange}
                        placeholder="IFSC code"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Important Information</h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• Your bank details will be used for receiving payments</li>
                      <li>• Please ensure all information is accurate</li>
                      <li>• Your account will be verified by our team</li>
                      <li>• You can update these details later from your dashboard</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                )}
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-auto"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
