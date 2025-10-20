import React from "react"
import { Construction, ArrowLeft, Sparkles, Rocket, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function UnderMaintenance() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Icon with enhanced animation */}
          <div className="mb-8 flex justify-center animate-fade-in">
            <div className="relative">
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-2xl animate-ping"></div>
              
              {/* Main icon container */}
              <div className="relative bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-full p-8 shadow-2xl border-4 border-pink-100 dark:border-pink-900/50">
                <Construction className="w-20 h-20 text-pink-600 dark:text-pink-400 animate-bounce" />
                
                {/* Floating decorative elements */}
                <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
                <Wrench className="w-5 h-5 text-blue-500 absolute -bottom-1 -left-1 animate-spin-slow" />
              </div>
            </div>
          </div>

          {/* Heading with gradient */}
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 text-center animate-fade-in-up">
            Under Development
          </h1>

          {/* Subheading */}
          <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3 text-center animate-fade-in-up animation-delay-100">
            We're crafting something amazing! ✨
          </p>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center animate-fade-in-up animation-delay-200">
            This feature is currently in active development. Stay tuned!
          </p>

          {/* Progress indicator */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8 border border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Development Progress</span>
              <span className="text-sm font-bold text-pink-600 dark:text-pink-400">75%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4 overflow-hidden">
              <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out animate-progress" style={{ width: '75%' }}></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center space-x-3 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">✓</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Design</p>
                  <p className="text-sm font-bold text-green-700 dark:text-green-400">Complete</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Development</p>
                  <p className="text-sm font-bold text-blue-700 dark:text-blue-400">In Progress</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Testing</p>
                  <p className="text-sm font-bold text-purple-700 dark:text-purple-400">Upcoming</p>
                </div>
              </div>
            </div>
          </div>

          {/* Available Features with better styling */}
          <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-blue-900/30 rounded-2xl p-8 mb-8 border-2 border-pink-200 dark:border-pink-800 shadow-lg animate-fade-in-up animation-delay-400">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-yellow-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Explore Available Features
              </h2>
              <Sparkles className="w-6 h-6 text-yellow-500 ml-2" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <span className="text-2xl">👤</span>
                <span className="text-gray-800 dark:text-gray-200 font-medium">User Authentication</span>
              </div>
              <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <span className="text-2xl">🏪</span>
                <span className="text-gray-800 dark:text-gray-200 font-medium">Vendor Dashboard</span>
              </div>
              <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <span className="text-2xl">🔍</span>
                <span className="text-gray-800 dark:text-gray-200 font-medium">Service Discovery</span>
              </div>
              <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <span className="text-2xl">💬</span>
                <span className="text-gray-800 dark:text-gray-200 font-medium">Messaging System</span>
              </div>
            </div>
          </div>

          {/* Action Buttons with enhanced styling */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-500">
            <Button 
              asChild 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 px-8 py-6 text-lg"
            >
              <Link href="/explore-services">
                <Sparkles className="w-5 h-5 mr-2" />
                <span>Explore Services</span>
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto border-2 border-gray-300 dark:border-gray-600 hover:border-pink-500 dark:hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 font-semibold px-8 py-6 text-lg transition-all duration-200"
            >
              <Link href="/">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span>Back to Home</span>
              </Link>
            </Button>
          </div>

          {/* Contact Info with better styling */}
          <div className="mt-12 pt-8 border-t-2 border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-600">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <p className="text-center text-gray-700 dark:text-gray-300 mb-2">
                <span className="font-semibold text-lg">Need Help?</span>
              </p>
              <p className="text-center text-gray-600 dark:text-gray-400">
                Questions or feedback? Reach out to us at{" "}
                <Link 
                  href="/contact" 
                  className="text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 font-bold underline decoration-2 underline-offset-2 transition-colors"
                >
                  support@blissmet.com
                </Link>
              </p>
              <p className="text-center text-sm text-gray-500 dark:text-gray-500 mt-3">
                We typically respond within 24 hours ⚡
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
