"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth, useUser } from "@clerk/nextjs"
import { Upload, Camera, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Footer } from "@/components/footer"
import { TermsAndConditionsDialog } from "@/components/terms-and-conditions-dialog"
import { PrivacyPolicyDialog } from "@/components/privacy-policy-dialog"
import { useToast } from "@/components/ui/use-toast"

export default function BecomeVendorPage() {
  const router = useRouter()
  const { isSignedIn, isLoaded } = useAuth()
  const { user } = useUser()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [showTermsDialog, setShowTermsDialog] = useState(false)
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    category: "",
    subCategories: [] as string[],
    description: "",
    experience: "",
    location: "Delhi",
    state: "Delhi",
    area: "",
    address: "",
    website: "",
    instagram: "",
    facebook: "",
    services: [] as string[],
    priceRange: "",
    portfolio: [] as File[],
    documents: [] as File[],
    // Financial & KYC Details
    gstNumber: "",
    panNumber: "",
    aadharNumber: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    termsAccepted: false,
  })

  // Check if user is logged in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast({
        title: "Authentication Required",
        description: "You need to login first to become a vendor!",
        variant: "destructive"
      })
      router.push("/sign-in")
    }
  }, [isLoaded, isSignedIn, router, toast])

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentStep])

  const categories = [
    "Venue",
    "Photography",
    "Catering",
    "Decoration",
    "DJ/Music",
    "Makeup Artist",
    "Mehndi Artist",
    "Florist",
    "Transportation",
    "Entertainment",
  ]

  const servicesByCategory = {
    Photography: ["Wedding Photography", "Pre-wedding Shoot", "Event Photography", "Portrait Photography"],
    Catering: ["North Indian", "South Indian", "Chinese", "Continental", "Desserts"],
    Decoration: ["Floral Decoration", "Theme Decoration", "Lighting", "Stage Decoration"],
    Venue: ["Banquet Hall", "Outdoor Venue", "Hotel", "Resort", "Farmhouse"],
    "DJ/Music": ["DJ Services", "Live Band", "Sound System", "Lighting Equipment"],
    "Makeup Artist": ["Bridal Makeup", "Party Makeup", "HD Makeup", "Airbrush Makeup", "Hair Styling"],
    "Mehndi Artist": ["Bridal Mehndi", "Arabic Mehndi", "Traditional Mehndi", "Contemporary Mehndi"],
    Florist: ["Wedding Flowers", "Bouquets", "Garlands", "Floral Arrangements", "Venue Decoration"],
    Transportation: ["Luxury Cars", "Vintage Cars", "Buses", "Guest Transportation", "Valet Service"],
    Entertainment: ["Live Band", "DJ", "Dance Performance", "Stand-up Comedy", "Anchoring"],
  }

  const locations = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
  ]

  const delhiAreas = [
    "Rohini",
    "Punjabi Bagh",
    "Dwarka",
    "Lajpat Nagar",
    "Connaught Place",
    "Karol Bagh",
    "Janakpuri",
    "Saket",
    "Vasant Kunj",
    "Pitampura",
    "Model Town",
    "Hauz Khas",
    "Greater Kailash",
    "Laxmi Nagar",
    "Preet Vihar",
    "Mayur Vihar",
    "Rajouri Garden",
    "Uttam Nagar",
    "Paharganj",
    "Rajendra Place",
  ]

  // Helper function to count words
  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter((word) => word.length > 0).length
  }

  // Helper function to validate email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Helper function to validate phone number (Indian format)
  const isValidPhone = (phone: string) => {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{4,10}$/
    const cleanPhone = phone.replace(/\s+/g, "")
    return phoneRegex.test(cleanPhone) && cleanPhone.replace(/\D/g, "").length >= 10
  }

  // Validate current step before moving forward
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.businessName.trim()) {
        newErrors.businessName = "Business name is required"
      }
      if (!formData.ownerName.trim()) {
        newErrors.ownerName = "Owner name is required"
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address"
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required"
      } else if (!isValidPhone(formData.phone)) {
        newErrors.phone = "Please enter a valid 10-digit phone number"
      }
      if (!formData.category) {
        newErrors.category = "Please select a category"
      }
      if (!formData.description.trim()) {
        newErrors.description = "Business description is required"
      } else if (countWords(formData.description) < 20) {
        newErrors.description = "Description must be at least 20 words"
      }
    }

    if (step === 2) {
      if (!formData.area) {
        newErrors.area = "Please select your area in Delhi"
      }
      if (!formData.address.trim()) {
        newErrors.address = "Complete address is required"
      }
      if (!formData.priceRange) {
        newErrors.priceRange = "Please select a price range"
      }
    }

    if (step === 3) {
      if (formData.services.length === 0) {
        newErrors.services = "Please select at least one service"
      }
    }

    if (step === 4) {
      // PAN Number validation (Optional, but if provided must be valid)
      if (formData.panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
        newErrors.panNumber = "Invalid PAN format (e.g., ABCDE1234F)"
      }

      // Aadhar Number validation (Optional, but if provided must be valid)
      const aadharDigits = formData.aadharNumber.replace(/\s/g, '')
      if (aadharDigits && !/^\d{12}$/.test(aadharDigits)) {
        newErrors.aadharNumber = "Aadhar must be 12 digits"
      }

      // GST Number validation (Optional, but if provided must be valid)
      if (formData.gstNumber && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstNumber)) {
        newErrors.gstNumber = "Invalid GST format (15 characters)"
      }

      // Bank Details validation - Only validate if any bank field is filled
      const hasBankInfo = formData.bankName || formData.accountNumber || formData.ifscCode || formData.accountHolderName
      
      if (hasBankInfo) {
        if (!formData.bankName) {
          newErrors.bankName = "Bank name is required if providing bank details"
        }
        if (!formData.accountNumber.trim()) {
          newErrors.accountNumber = "Account number is required if providing bank details"
        } else if (formData.accountNumber.length < 9 || formData.accountNumber.length > 18) {
          newErrors.accountNumber = "Account number must be 9-18 digits"
        }
        if (!formData.ifscCode.trim()) {
          newErrors.ifscCode = "IFSC code is required if providing bank details"
        } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
          newErrors.ifscCode = "Invalid IFSC format (e.g., SBIN0001234)"
        }
        if (!formData.accountHolderName.trim()) {
          newErrors.accountHolderName = "Account holder name is required if providing bank details"
        }
      } else if (formData.accountNumber || formData.ifscCode) {
        // If only account number or IFSC provided without bank name
        if (formData.accountNumber && formData.accountNumber.length < 9) {
          newErrors.accountNumber = "Account number must be at least 9 digits"
        }
        if (formData.ifscCode && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
          newErrors.ifscCode = "Invalid IFSC format (e.g., SBIN0001234)"
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1)
      }
    } else {
      // Scroll to first error
      window.scrollTo({ top: 300, behavior: "smooth" })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleSubmit = async () => {
    if (!formData.termsAccepted) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive"
      })
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/vendor/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName: formData.businessName,
          ownerName: formData.ownerName,
          email: formData.email,
          phone: formData.phone,
          category: formData.category,
          description: formData.description,
          experience: formData.experience,
          location: formData.location,
          state: formData.state,
          area: formData.area,
          address: formData.address,
          website: formData.website,
          instagram: formData.instagram,
          facebook: formData.facebook,
          services: formData.services,
          priceRange: formData.priceRange,
          gstNumber: formData.gstNumber,
          panNumber: formData.panNumber,
          aadharNumber: formData.aadharNumber,
          bankName: formData.bankName,
          accountNumber: formData.accountNumber,
          ifscCode: formData.ifscCode,
          accountHolderName: formData.accountHolderName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      // Show success message
      toast({
        title: "Success! 🎉",
        description: data.message || "Application submitted successfully! Redirecting to vendor dashboard...",
        variant: "default"
      })
      
      // Reload user data to fetch updated role from Clerk
      try {
        if (user) {
          await user.reload();
          console.log("User data reloaded successfully. New role:", user.unsafeMetadata?.role);
        }
      } catch (reloadError) {
        console.error("Error reloading user data:", reloadError);
      }
      
      // Small delay to show the success message before redirecting
      setTimeout(() => {
        router.push("/vendor-dashboard");
        router.refresh(); // Also refresh Next.js router cache
      }, 1500);
    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Business Information</h2>
        <p className="text-gray-600">Tell us about your business</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="businessName">Business Name *</Label>
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
            placeholder="Enter your business name"
            className={errors.businessName ? "border-red-500" : ""}
          />
          {errors.businessName && <p className="text-xs text-red-500 mt-1">{errors.businessName}</p>}
        </div>

        <div>
          <Label htmlFor="ownerName">Owner Name *</Label>
          <Input
            id="ownerName"
            value={formData.ownerName}
            onChange={(e) => setFormData((prev) => ({ ...prev, ownerName: e.target.value }))}
            placeholder="Enter owner's full name"
            className={errors.ownerName ? "border-red-500" : ""}
          />
          {errors.ownerName && <p className="text-xs text-red-500 mt-1">{errors.ownerName}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="business@example.com"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            placeholder="+91 98765 43210"
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <Label htmlFor="category">Primary Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
          >
            <SelectTrigger className={errors.category ? "border-red-500" : ""}>
              <SelectValue placeholder="Select your primary service" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
        </div>

        <div>
          <Label htmlFor="experience">Years of Experience</Label>
          <Input
            id="experience"
            type="number"
            value={formData.experience}
            onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
            placeholder="Enter years of experience"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Business Description * (Minimum 20 words)</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Describe your business, services, and what makes you unique..."
          rows={4}
          className={errors.description ? "border-red-500" : ""}
        />
        <div className="flex justify-between items-center mt-1">
          <p className={`text-xs ${countWords(formData.description) < 20 ? "text-red-500" : "text-green-600"}`}>
            {countWords(formData.description)} / 20 words minimum
          </p>
          {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Location & Contact</h2>
        <p className="text-gray-600">Where are you located and how can clients reach you?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            value="Delhi"
            disabled
            className="bg-gray-100 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1">Currently serving Delhi region</p>
        </div>

        <div>
          <Label htmlFor="area">Area/Locality *</Label>
          <Select
            value={formData.area}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, area: value }))}
          >
            <SelectTrigger className={errors.area ? "border-red-500" : ""}>
              <SelectValue placeholder="Select your area" />
            </SelectTrigger>
            <SelectContent>
              {delhiAreas.map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.area && <p className="text-xs text-red-500 mt-1">{errors.area}</p>}
        </div>

        <div>
          <Label htmlFor="priceRange">Price Range *</Label>
          <Select
            value={formData.priceRange}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, priceRange: value }))}
          >
            <SelectTrigger className={errors.priceRange ? "border-red-500" : ""}>
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="budget">Budget (₹10k - ₹50k)</SelectItem>
              <SelectItem value="mid-range">Mid-range (₹50k - ₹2L)</SelectItem>
              <SelectItem value="premium">Premium (₹2L - ₹5L)</SelectItem>
              <SelectItem value="luxury">Luxury (₹5L+)</SelectItem>
            </SelectContent>
          </Select>
          {errors.priceRange && <p className="text-xs text-red-500 mt-1">{errors.priceRange}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="address">Complete Address *</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
          placeholder="Enter your complete business address..."
          rows={3}
          className={errors.address ? "border-red-500" : ""}
        />
        {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="website">Website (Optional)</Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div>
          <Label htmlFor="instagram">Instagram (Optional)</Label>
          <Input
            id="instagram"
            value={formData.instagram}
            onChange={(e) => setFormData((prev) => ({ ...prev, instagram: e.target.value }))}
            placeholder="@yourbusiness"
          />
        </div>

        <div>
          <Label htmlFor="facebook">Facebook (Optional)</Label>
          <Input
            id="facebook"
            value={formData.facebook}
            onChange={(e) => setFormData((prev) => ({ ...prev, facebook: e.target.value }))}
            placeholder="facebook.com/yourbusiness"
          />
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Services & Portfolio</h2>
        <p className="text-gray-600">What services do you offer?</p>
      </div>

      {formData.category && servicesByCategory[formData.category as keyof typeof servicesByCategory] && (
        <div>
          <Label>Services Offered *</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
            {servicesByCategory[formData.category as keyof typeof servicesByCategory].map((service) => (
              <div key={service} className="flex items-center space-x-2">
                <Checkbox
                  id={service}
                  checked={formData.services.includes(service)}
                  onCheckedChange={() => handleServiceToggle(service)}
                />
                <Label htmlFor={service} className="text-sm">
                  {service}
                </Label>
              </div>
            ))}
          </div>
          {errors.services && <p className="text-xs text-red-500 mt-2">{errors.services}</p>}
        </div>
      )}

      <div>
        <Label>Portfolio Images *</Label>
        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
          <Camera className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">Upload your best work</p>
          <p className="text-sm text-gray-500 mb-4">PNG, JPG up to 10MB each (Max 10 images)</p>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Choose Images
          </Button>
        </div>
      </div>

      <div>
        <Label>Business Documents</Label>
        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 mb-2">Upload business registration, GST certificate, etc.</p>
          <Button variant="outline" size="sm">
            Choose Files
          </Button>
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Financial Information & KYC Details</h2>
        <p className="text-gray-600">Please provide your business and banking information for verification (Optional - can be provided later)</p>
      </div>

      {/* KYC Documents Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            📄 KYC Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="gstNumber">GST Number (Optional)</Label>
              <Input
                id="gstNumber"
                value={formData.gstNumber}
                onChange={(e) => setFormData((prev) => ({ ...prev, gstNumber: e.target.value.toUpperCase() }))}
                placeholder="22AAAAA0000A1Z5"
                maxLength={15}
                className={errors.gstNumber ? "border-red-500" : ""}
              />
              <p className="text-xs text-gray-500 mt-1">15 characters (e.g., 22AAAAA0000A1Z5)</p>
              {errors.gstNumber && <p className="text-xs text-red-500 mt-1">{errors.gstNumber}</p>}
            </div>

            <div>
              <Label htmlFor="panNumber">PAN Number (Optional)</Label>
              <Input
                id="panNumber"
                value={formData.panNumber}
                onChange={(e) => setFormData((prev) => ({ ...prev, panNumber: e.target.value.toUpperCase() }))}
                placeholder="ABCDE1234F"
                maxLength={10}
                className={errors.panNumber ? "border-red-500" : ""}
              />
              <p className="text-xs text-gray-500 mt-1">10 characters (e.g., ABCDE1234F)</p>
              {errors.panNumber && <p className="text-xs text-red-500 mt-1">{errors.panNumber}</p>}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="aadharNumber">Aadhar Number (Optional)</Label>
              <Input
                id="aadharNumber"
                value={formData.aadharNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '')
                  const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ')
                  setFormData((prev) => ({ ...prev, aadharNumber: formatted }))
                }}
                placeholder="1234 5678 9012"
                maxLength={14}
                className={errors.aadharNumber ? "border-red-500" : ""}
              />
              <p className="text-xs text-gray-500 mt-1">12 digits (e.g., 1234 5678 9012)</p>
              {errors.aadharNumber && <p className="text-xs text-red-500 mt-1">{errors.aadharNumber}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bank Details Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            💳 Bank Account Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="bankName">Bank Name (Optional)</Label>
              <Select
                value={formData.bankName}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, bankName: value }))}
              >
                <SelectTrigger className={errors.bankName ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select your bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="State Bank of India">State Bank of India</SelectItem>
                  <SelectItem value="HDFC Bank">HDFC Bank</SelectItem>
                  <SelectItem value="ICICI Bank">ICICI Bank</SelectItem>
                  <SelectItem value="Axis Bank">Axis Bank</SelectItem>
                  <SelectItem value="Punjab National Bank">Punjab National Bank</SelectItem>
                  <SelectItem value="Bank of Baroda">Bank of Baroda</SelectItem>
                  <SelectItem value="Kotak Mahindra Bank">Kotak Mahindra Bank</SelectItem>
                  <SelectItem value="IndusInd Bank">IndusInd Bank</SelectItem>
                  <SelectItem value="Yes Bank">Yes Bank</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.bankName && <p className="text-xs text-red-500 mt-1">{errors.bankName}</p>}
            </div>

            <div>
              <Label htmlFor="accountNumber">Account Number (Optional)</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => setFormData((prev) => ({ ...prev, accountNumber: e.target.value.replace(/\D/g, '') }))}
                placeholder="12345678901234"
                maxLength={18}
                className={errors.accountNumber ? "border-red-500" : ""}
              />
              {errors.accountNumber && <p className="text-xs text-red-500 mt-1">{errors.accountNumber}</p>}
            </div>

            <div>
              <Label htmlFor="ifscCode">IFSC Code (Optional)</Label>
              <Input
                id="ifscCode"
                value={formData.ifscCode}
                onChange={(e) => setFormData((prev) => ({ ...prev, ifscCode: e.target.value.toUpperCase() }))}
                placeholder="SBIN0001234"
                maxLength={11}
                className={errors.ifscCode ? "border-red-500" : ""}
              />
              <p className="text-xs text-gray-500 mt-1">11 characters (e.g., SBIN0001234)</p>
              {errors.ifscCode && <p className="text-xs text-red-500 mt-1">{errors.ifscCode}</p>}
            </div>

            <div>
              <Label htmlFor="accountHolderName">Account Holder Name (Optional)</Label>
              <Input
                id="accountHolderName"
                value={formData.accountHolderName}
                onChange={(e) => setFormData((prev) => ({ ...prev, accountHolderName: e.target.value }))}
                placeholder="Name as per bank account"
                className={errors.accountHolderName ? "border-red-500" : ""}
              />
              <p className="text-xs text-gray-500 mt-1">Name as per bank account</p>
              {errors.accountHolderName && <p className="text-xs text-red-500 mt-1">{errors.accountHolderName}</p>}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-sm text-blue-800 flex items-center gap-2">
              🔒 All your information is encrypted and secure. We use industry-standard security measures to protect your data.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Review & Submit</h2>
        <p className="text-gray-600">Please review your information before submitting</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-pink-500" />
            Application Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Business Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-pink-600">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700">Business Name</h4>
                <p className="text-gray-900">{formData.businessName || "Not provided"}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Owner Name</h4>
                <p className="text-gray-900">{formData.ownerName || "Not provided"}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Email</h4>
                <p className="text-gray-900">{formData.email || "Not provided"}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Phone</h4>
                <p className="text-gray-900">{formData.phone || "Not provided"}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Category</h4>
                <p className="text-gray-900">{formData.category || "Not selected"}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Experience</h4>
                <p className="text-gray-900">{formData.experience ? `${formData.experience} years` : "Not specified"}</p>
              </div>
              <div className="md:col-span-2">
                <h4 className="font-medium text-gray-700">Description</h4>
                <p className="text-gray-900">{formData.description || "Not provided"}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Location & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-pink-600">Location & Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700">State</h4>
                <p className="text-gray-900">Delhi</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Area</h4>
                <p className="text-gray-900">{formData.area || "Not selected"}</p>
              </div>
              <div className="md:col-span-2">
                <h4 className="font-medium text-gray-700">Address</h4>
                <p className="text-gray-900">{formData.address || "Not provided"}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Price Range</h4>
                <p className="text-gray-900">{formData.priceRange ? formData.priceRange.replace('-', ' - ').toUpperCase() : "Not selected"}</p>
              </div>
              {formData.website && (
                <div>
                  <h4 className="font-medium text-gray-700">Website</h4>
                  <p className="text-gray-900">{formData.website}</p>
                </div>
              )}
              {formData.instagram && (
                <div>
                  <h4 className="font-medium text-gray-700">Instagram</h4>
                  <p className="text-gray-900">{formData.instagram}</p>
                </div>
              )}
              {formData.facebook && (
                <div>
                  <h4 className="font-medium text-gray-700">Facebook</h4>
                  <p className="text-gray-900">{formData.facebook}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Services */}
          {formData.services.length > 0 && (
            <>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-pink-600">Services Offered</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.services.map((service) => (
                    <Badge key={service} variant="secondary" className="text-sm">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Financial & KYC Details */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-pink-600">Financial & KYC Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.gstNumber && (
                <div>
                  <h4 className="font-medium text-gray-700">GST Number</h4>
                  <p className="text-gray-900">{formData.gstNumber}</p>
                </div>
              )}
              {formData.panNumber && (
                <div>
                  <h4 className="font-medium text-gray-700">PAN Number</h4>
                  <p className="text-gray-900">{formData.panNumber}</p>
                </div>
              )}
              {formData.aadharNumber && (
                <div>
                  <h4 className="font-medium text-gray-700">Aadhar Number</h4>
                  <p className="text-gray-900">{formData.aadharNumber}</p>
                </div>
              )}
              {formData.bankName && (
                <div>
                  <h4 className="font-medium text-gray-700">Bank Name</h4>
                  <p className="text-gray-900">{formData.bankName}</p>
                </div>
              )}
              {formData.accountNumber && (
                <div>
                  <h4 className="font-medium text-gray-700">Account Number</h4>
                  <p className="text-gray-900">{"*".repeat(formData.accountNumber.length - 4) + formData.accountNumber.slice(-4)}</p>
                </div>
              )}
              {formData.ifscCode && (
                <div>
                  <h4 className="font-medium text-gray-700">IFSC Code</h4>
                  <p className="text-gray-900">{formData.ifscCode}</p>
                </div>
              )}
              {formData.accountHolderName && (
                <div>
                  <h4 className="font-medium text-gray-700">Account Holder Name</h4>
                  <p className="text-gray-900">{formData.accountHolderName}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={formData.termsAccepted}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, termsAccepted: checked as boolean }))}
            />
            <Label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  setShowTermsDialog(true)
                }}
                className="text-blue-600 hover:underline font-medium"
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  setShowPrivacyDialog(true)
                }}
                className="text-blue-600 hover:underline font-medium"
              >
                Privacy Policy
              </button>
              . I understand that my application will be reviewed and I will be notified of the status within 2-3
              business days.
            </Label>
          </div>
        </CardContent>
      </Card>

      <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-4">
        <h4 className="font-medium text-pink-800 mb-2">What happens next?</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Your application will be reviewed by our team</li>
          <li>• We'll verify your documents and portfolio</li>
          <li>• You'll receive an email notification within 2-3 business days</li>
          <li>• Once approved, you can start receiving bookings!</li>
        </ul>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Become a Vendor
            </h1>
            <div className="text-sm text-gray-600">Step {currentStep} of 5</div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2.5 rounded-full transition-all duration-300 shadow-sm"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1 || isSubmitting}>
                Previous
              </Button>

              {currentStep < 5 ? (
                <Button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-md"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.termsAccepted || isSubmitting}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block animate-spin mr-2">⏳</span>
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />

      {/* Terms and Privacy Policy Dialogs */}
      <TermsAndConditionsDialog open={showTermsDialog} onOpenChange={setShowTermsDialog} />
      <PrivacyPolicyDialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog} />
    </main>
  )
}
