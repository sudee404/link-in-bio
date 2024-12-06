"use client"
import { motion } from 'framer-motion'
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => {
        setTheme(isDark ? 'light' : 'dark');
      }}
      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 ${
        isDark ? 'bg-gray-800' : 'bg-purple-600'
      }`}
    >
      <motion.span
        layout
        className="inline-block h-6 w-6 transform rounded-full bg-white shadow-lg"
        animate={{ x: isDark ? 30 : 2 }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      />
      <span className={`absolute ${isDark ? 'left-2' : 'right-2'} text-white`}>
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}
