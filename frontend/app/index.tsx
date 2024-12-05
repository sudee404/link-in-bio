"use client"
import Link from 'next/link'
import { motion } from "motion/react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-white"
        >
          <h1 className="text-5xl font-bold mb-4">Welcome to LinkFolio</h1>
          <p className="text-xl mb-8">Your ultimate link-in-bio solution</p>
        </motion.div>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden" data-aos="fade-up">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get Started</h2>
            <p className="text-gray-600 mb-6">Create your personalized link-in-bio page in minutes. Showcase all your important links in one beautiful, customizable page.</p>
            <Link
              href="/alexj"
              className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-4 rounded-lg text-center transition duration-300 ease-in-out hover:from-purple-600 hover:to-pink-600 transform hover:-translate-y-1 hover:shadow-lg"
            >
              View Demo Page
            </Link>
          </div>
          <div className="bg-gray-100 px-8 py-4">
            <p className="text-gray-600 text-sm">Already have an account? <Link href="/dashboard" className="text-purple-600 font-semibold">Log in</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

