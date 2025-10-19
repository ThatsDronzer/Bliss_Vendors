import React from "react"
import { Construction, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function UnderMaintenance() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-2xl"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-full p-6 shadow-xl">
                <Construction className="w-16 h-16 text-pink-500" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Under Maintenance
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            We're working on something exciting!
          </p>

          {/* Description */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This feature is currently under development and testing. We're working hard to bring you the best experience possible.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              🚀 Coming Soon | 🔧 Under Testing | ✨ New Features Loading...
            </p>
          </div>

          {/* Available Features */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Available Now:
            </h2>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
              <li>✅ User Login & Signup</li>
              <li>✅ Vendor Login & Signup</li>
              <li>✅ Explore Services</li>
              <li>✅ Vendor Dashboard</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild variant="default" size="lg" className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600">
              <Link href="/explore-services">
                <span>Explore Services</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Back to Home</span>
              </Link>
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Have questions? Contact us at{" "}
              <Link href="/contact" className="text-pink-500 hover:text-pink-600 font-medium">
                support@blissmet.com
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
