"use client"
import Link from 'next/link'
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-400 to-pink-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Your Digital Identity in One Simple Link
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Create a beautiful landing page that showcases all your important links, social media, and content in one place.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/register" className="rounded-md bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 transition-all">
                Get Started Free
              </Link>
              <Link href="/demo" className="text-sm font-semibold text-gray-900 hover:text-purple-600 transition-all">
                View Demo <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Everything you need to showcase your online presence</h2>
            <p className="mt-4 text-lg text-gray-600">Powerful features to help you manage and grow your digital identity</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Beautiful Themes",
                description: "Choose from our collection of stunning themes or create your own custom design.",
                icon: "🎨"
              },
              {
                title: "Analytics Dashboard",
                description: "Track your link performance with detailed insights and visitor statistics.",
                icon: "📊"
              },
              {
                title: "Social Integration",
                description: "Connect all your social media profiles in one centralized location.",
                icon: "🔗"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Loved by creators worldwide</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">U{i}</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">User {i}</h4>
                    <p className="text-sm text-gray-500">Digital Creator</p>
                  </div>
                </div>
                <p className="text-gray-600">"LinkFolio has transformed how I present myself online. The analytics features are incredible!"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">Simple, transparent pricing</h2>
            <p className="mt-4 text-lg text-gray-600">Choose the perfect plan for your needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "Free",
                features: ["Basic analytics", "5 custom links", "Standard themes"]
              },
              {
                name: "Pro",
                price: "$9/month",
                features: ["Advanced analytics", "Unlimited links", "Custom themes", "Priority support"]
              },
              {
                name: "Business",
                price: "$29/month",
                features: ["Team collaboration", "API access", "Custom domain", "24/7 support"]
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold mb-6">{plan.price}</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="w-5 h-5 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="mt-8 w-full py-2 px-4 border border-purple-600 rounded-md text-purple-600 hover:bg-purple-600 hover:text-white transition-all">
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to get started?</h2>
          <Link href="/register" className="inline-block bg-purple-600 text-white px-8 py-3 rounded-md hover:bg-purple-500 transition-all">
            Create your LinkFolio now
          </Link>
        </div>
      </div>
    </div>
  )
}
