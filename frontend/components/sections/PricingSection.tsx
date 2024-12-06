"use client"
import { motion } from "framer-motion"

const plans = [
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
]

export default function PricingSection() {
  return (
    <div className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 inline-block text-transparent bg-clip-text">Simple, transparent pricing</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Choose the perfect plan for your needs</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 p-8 rounded-2xl shadow-lg hover:shadow-xl dark:shadow-purple-500/10 transition-all border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{plan.name}</h3>
              <p className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">{plan.price}</p>
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-5 h-5 text-indigo-500 dark:text-indigo-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-8 w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white rounded-xl hover:opacity-90 transition-all duration-200 transform hover:scale-[1.02]">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
