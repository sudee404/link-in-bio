"use client"
import { motion } from "framer-motion"

export default function TestimonialsSection() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-black dark:text-white">
        <h2 className="text-3xl font-bold text-center mb-16 ">Loved by creators worldwide</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}

              className="bg-gray-300 dark:bg-gray-800 p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-center mb-4">


                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-200 font-semibold">U{i}</span>
                </div>
                <div className="ml-4">


                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">User {i}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Digital Creator</p>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300">"LinkFolio has transformed how I present myself online. The analytics features are incredible!"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
