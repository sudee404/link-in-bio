"use client"
import { motion } from "framer-motion"

const features = [
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
]

export default function FeaturesSection() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8  text-black dark:text-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">Everything you need to showcase your online presence</h2>
          <p className="mt-4 text-lg">Powerful features to help you manage and grow your digital identity</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-300 dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}