"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={`relative inline-flex h-12 w-24 items-center rounded-full transition-colors duration-300 ${
        isDark ? 'bg-gray-800' : 'bg-purple-600'
      }`}
    >
      <motion.span
        layout
        className="inline-block h-10 w-10 transform rounded-full bg-white shadow-lg"
        animate={{ x: isDark ? 50 : 4 }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      />
      <span className={`absolute ${isDark ? 'left-4' : 'right-4'} text-white`}>
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}
