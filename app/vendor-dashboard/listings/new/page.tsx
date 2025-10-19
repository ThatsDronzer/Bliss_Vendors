"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, X, IndianRupee } from "lucide-react"
import { useAuth, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { useSession } from '@clerk/clerk-react';
import { Badge } from "@/components/ui/badge"

interface CloudinaryUploadResponse {
  public_id: string;
  secure_url: string;
  created_at: string;
}

export default function NewListingPage() {
  const { session } = useSession();
  const [token, setToken] = useState<string | null>(null)
  const [tokenLoading, setTokenLoading] = useState(true)
  const router = useRouter()
  const { isSignedIn, isLoaded } = useAuth()
  const { user } = useUser()
  const userRole = user?.unsafeMetadata?.role as string || "user"
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    location: "",
    capacity: "",
    features: [] as string[],
  })
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("")
  const [vendorData, setVendorData] = useState<any>(null)
  const [isLoadingVendor, setIsLoadingVendor] = useState(true)

  useEffect(() => {
    const fetchToken = async () => {
      setTokenLoading(true);
      try {
        if (session) {
          const userToken = await session.getToken();
          console.log("Token fetched:", userToken ? "Success" : "Failed");
          setToken(userToken);
        } else {
          console.log("No session available");
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      } finally {
        setTokenLoading(false);
      }
    };

    if (isSignedIn && session) {
      fetchToken();
    } else {
      setTokenLoading(false);
    }
  }, [session, isSignedIn]);

  // Fetch vendor data to pre-populate fields
  useEffect(() => {
    const fetchVendorData = async () => {
      if (user?.id) {
        setIsLoadingVendor(true)
        try {
          const response = await fetch(`/api/vendor/${user.id}`)
          if (response.ok) {
            const data = await response.json()
            setVendorData(data)
            
            // Pre-populate form fields from vendor data
            setFormData(prev => ({
              ...prev,
              category: data.service_type || "",
              location: data.service_address?.City || "",
            }))
          }
        } catch (error) {
          console.error("Error fetching vendor data:", error)
        } finally {
          setIsLoadingVendor(false)
        }
      }
    }
    
    if (isSignedIn && user?.id) {
      fetchVendorData()
    }
  }, [user?.id, isSignedIn])

  // Redirect if not authenticated or not a vendor
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in?role=vendor")
    } else if (isLoaded && isSignedIn && userRole !== "vendor") {
      router.push("/")
    }
  }, [isLoaded, isSignedIn, userRole, router])

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  if (!isLoaded || !isSignedIn || userRole !== "vendor" || tokenLoading || isLoadingVendor) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  const categories = [
    "Wedding Venue",
    "Photography",
    "Catering",
    "Decoration",
    "Music & DJ",
    "Transportation",
    "Beauty & Makeup",
    "Florist",
    "Wedding Planner",
    "Other",
  ]

  const handleInputChange = (field: string, value: string | string[]) => {
    // Handle price field - only allow digits
    if (field === "price" && typeof value === "string") {
      const digitsOnly = value.replace(/\D/g, "")
      setFormData((prev) => ({ ...prev, [field]: digitsOnly }))
      return
    }
    
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    const validFiles = files.filter(file => {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error(`File too large: ${file.name} (max 10MB)`);
        return false;
      }
      return true;
    });

    const previews = validFiles.map(file => URL.createObjectURL(file));
    setSelectedFiles(prev => [...prev, ...validFiles]);
    setImagePreviews(prev => [...prev, ...previews]);
  };

  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Features functions
  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }))
      setNewFeature("")
    } else {
      toast.error("Please enter a feature")
    }
  }

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const handleFeatureKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddFeature();
    }
  }

  const uploadImagesToCloudinary = async (files: File[]): Promise<CloudinaryUploadResponse[]> => {
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'nextjs_unsigned_upload');
      formData.append('folder', 'listings');
      formData.append('tags', 'temporary');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      return response.json();
    });

    return Promise.all(uploadPromises);
  };

  const deleteUploadedImages = async (images: any[]) => {
  for (const image of images) {
    try {
      await fetch('/api/delete-image', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicId: image.public_id }),
      });
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  }
};

  const validateForm = () => {
    if (!formData.title || !formData.description || !formData.category || !formData.price) {
      return "Please fill in all required fields (Title, Description, Category, Price)"
    }
    
    // Validate description word count (minimum 20 words)
    const trimmedDescription = formData.description.trim()
    const wordCount = trimmedDescription ? trimmedDescription.split(/\s+/).filter(Boolean).length : 0
    
    if (wordCount < 20) {
      return `Description must be at least 20 words (current: ${wordCount} words)`
    }
    
    if (selectedFiles.length === 0) {
      return "Please upload at least one image"
    }
    return null
  }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const validationError = validateForm();
  if (validationError) {
    toast.error(validationError);
    return;
  }

  setIsLoading(true);

  try {
    // Upload main listing images
    const uploadedImages = await uploadImagesToCloudinary(selectedFiles);

    // Extract public_ids for cleanup
    const mainImageIds = uploadedImages.map(img => img.public_id);

    // Send to your API
    const response = await fetch('/api/listing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price.replace(/[^0-9.-]+/g, "")) || 0,
        location: formData.location,
        category: formData.category,
        features: formData.features,
        images: uploadedImages,
        tempImageIds: mainImageIds, // For cleanup
      }),
    });

    if (!response.ok) {
      // Clean up all uploaded images on error
      await deleteUploadedImages(uploadedImages);
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create listing');
    }

    toast.success("Listing created successfully");
    router.push("/vendor-dashboard/listings");

  } catch (err) {
    console.error("Error in handleSubmit:", err);
    toast.error(err instanceof Error ? err.message : "An unexpected error occurred");
  } finally {
    setIsLoading(false);
  }
};
  const handleCancel = () => {
    imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
    router.push("/vendor-dashboard/listings");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/vendor-dashboard/listings")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Listings
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Add New Listing</h1>
          <p className="text-gray-500 mt-1">Create a new venue or service listing</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Provide the essential details about your listing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter listing title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleInputChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">Pre-filled from your vendor profile, you can modify if needed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="e.g., 50000"
                    required
                  />
                  {formData.price && (
                    <p className="text-xs text-gray-500">Display: ₹{parseInt(formData.price).toLocaleString('en-IN')}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Enter location"
                  />
                  <p className="text-xs text-gray-500">Pre-filled from your vendor profile, you can modify if needed</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description * (Minimum 20 words)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your service or venue in detail..."
                  rows={4}
                  required
                />
                <p className={`text-xs ${
                  formData.description.trim().split(/\s+/).filter(Boolean).length < 20 
                    ? 'text-red-500' 
                    : 'text-gray-500'
                }`}>
                  Word count: {formData.description.trim().split(/\s+/).filter(Boolean).length}/20 minimum
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Listing Images</CardTitle>
              <CardDescription>Select images for your main listing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
              />

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>Add key features or amenities (e.g., Air Conditioning, Free WiFi, Parking, etc.)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={handleFeatureKeyPress}
                  placeholder="Enter a feature (e.g., Air Conditioning)"
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleAddFeature}
                  disabled={!newFeature.trim()}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>

              {formData.features.length > 0 && (
                <div className="space-y-2">
                  <Label>Added Features:</Label>
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {feature}
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Listing"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}