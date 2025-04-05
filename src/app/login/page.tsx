"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, Lock } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"

export default function LoginPage() {
  const { authState, login } = useAuth()
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // If already authenticated, redirect to calls page
  useEffect(() => {
    if (authState.isAuthenticated) {
      router.push("/calls")
    }
  }, [authState.isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Simple form validation
    if (!username || !password) {
      setError("Username and password are required")
      return
    }

    setIsSubmitting(true)

    try {
      await login({ username, password })
      // We don't need to redirect here since the effect will handle it
    } catch {
      setError(authState.error || "Login failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-['Avenir'] text-black">
      {/* Header */}
      <header className="w-full bg-white py-4 px-4 sm:px-6 border-b shadow-sm">
        <div className="flex items-center">
          <div className="h-6 w-6 bg-[#5E35B1] rounded mr-2"></div>
            <Image 
              src="/logos/TT Logo.png" 
              alt="Company Logo" 
              width={200} 
              height={80} 
              className="h-8 sm:h-12 w-auto"
            />
        </div>
      </header>

      {/* Login Form */}
      <div className="flex justify-center items-center px-4 sm:px-6" style={{ height: "calc(100vh - 64px)" }}>
        <div className="bg-white rounded p-4 sm:p-8 w-full max-w-md shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 sm:mb-6">
              <label className="block mb-2 text-sm text-black font-medium">
                <span className="text-red-500">*</span> User Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="mb-4 sm:mb-6">
              <label className="block mb-2 text-sm text-black font-medium">
                <span className="text-red-500">*</span> Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                  placeholder="Password"
                />
              </div>
            </div>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-[#4285F4] text-white py-2 px-6 rounded hover:bg-blue-600 focus:outline-none font-medium"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                "Log in"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

