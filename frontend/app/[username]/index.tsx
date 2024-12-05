"use client"
import { sampleUser } from '@/lib/sample-data'
import { motion } from "motion/react"
import { ExternalLink } from 'lucide-react'

export default function UserPage({username}:{username:string}) {
  // In a real app, you'd fetch the user data based on the username
  const user = sampleUser

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 py-12 px-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
          />
          <h1 className="text-2xl font-bold text-white mb-2">{user.name}</h1>
          <p className="text-white text-opacity-80">{user.bio}</p>
        </motion.div>
        <div className="space-y-4">
          {user.links.map((link, index) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg px-6 py-4 text-white transition duration-300 ease-in-out hover:bg-opacity-30 transform hover:-translate-y-1 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-4">{link.icon}</span>
                <span className="flex-grow">{link.title}</span>
                <ExternalLink className="w-5 h-5" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}

