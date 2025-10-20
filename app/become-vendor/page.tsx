"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { UnderMaintenance } from "@/components/under-maintenance"

export default function BecomeVendorPage() {
  const router = useRouter()
  const { isSignedIn, isLoaded } = useAuth()

  // Check authentication before showing the page
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // Redirect to sign-in page if not authenticated
      router.push("/sign-in?redirect=/become-vendor")
    }
  }, [isSignedIn, isLoaded, router])

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

  // Show maintenance page only if authenticated
  return <UnderMaintenance />
}
