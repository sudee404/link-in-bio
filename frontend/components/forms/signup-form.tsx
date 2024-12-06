"use client"

import * as React from "react"
import Link from "next/link"
import { Mail } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export function SignUpForm() {
  const [isLoading, setIsLoading] = React.useState(false)

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center p-8">
      <div className="space-y-6">
        <div>
          <Link href="/" className="text-2xl font-bold text-blue-500">
            autofyle
          </Link>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Authorized dealer and distributor network onboarding
          </h2>
          <p className="text-gray-600">
            More than 5000 authorized dealers and distributors have chosen AutoFyle to grow their businesses using our intelligent suite of applications
          </p>
        </div>
        <div className="relative w-64 h-64">
          <img 
            src="/placeholder.svg?height=256&width=256" 
            alt="Handshake illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create Your Account
            </h1>
            <Link href="/login" className="text-sm text-blue-500 hover:underline">
              Already have an account?
            </Link>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
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
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                disabled={isLoading}
                required
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="accountType" className="text-sm font-medium">
                  Account Type
                </label>
                <Select
                  id="accountType"
                  disabled={isLoading}
                  required
                >
                  <option value="">Select Account Type</option>
                  <option value="employee">Employee</option>
                  <option value="dealer">Dealer</option>
                  <option value="distributor">Distributor</option>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                  Your Company
                </label>
                <Input
                  id="company"
                  placeholder="Company name"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
            <Checkbox
              aria-label="By clicking 'Sign Up' you agree to our Terms and Privacy Policy"
              required
            />
            <button
              type="submit"
              className={cn(
                "w-full rounded-md bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                isLoading && "opacity-50 cursor-wait"
              )}
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

