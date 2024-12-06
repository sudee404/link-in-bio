"use client"

import * as React from "react"
import Link from "next/link"
import { Mail } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export function SignInForm() {
  const [isLoading, setIsLoading] = React.useState(false)

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="relative mx-auto w-48 h-48 mb-8">
            <img 
              src="/placeholder.svg?height=192&width=192" 
              alt="Autofyle mascot"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <Link href="/" className="text-2xl font-bold text-blue-500">
                autofyle
              </Link>
            </div>
            <h1 className="text-xl font-semibold text-center mb-6">
              Sign Into Your Account
            </h1>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  E-mail
                </label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  icon={<Mail className="h-4 w-4" />}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <Checkbox
                  aria-label="Remember this device"
                />
                <Link
                  href="/signup"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Don't have an account?
                </Link>
              </div>
              <button
                type="submit"
                className={cn(
                  "w-full rounded-md bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                  isLoading && "opacity-50 cursor-wait"
                )}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <footer className="text-center p-4 text-sm text-gray-600">
        <div className="space-x-4">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms of Use
          </Link>
        </div>
        <div className="mt-2">
          © 2024 BNC. All Rights Reserved
        </div>
      </footer>
    </div>
  )
}

