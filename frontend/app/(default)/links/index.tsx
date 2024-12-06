'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sampleUser } from '@/lib/sample-data'
import { Trash2, Plus, Save } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const [links, setLinks] = useState(sampleUser.links)
  const [newLink, setNewLink] = useState({ title: '', url: '', icon: '' })

  const addLink = (e: React.FormEvent) => {
    e.preventDefault()
    if (newLink.title && newLink.url) {
      setLinks([...links, { ...newLink, id: Date.now().toString() }])
      setNewLink({ title: '', url: '', icon: '' })
    }
  }

  const removeLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <div className="flex justify-between items-center mb-6">
            <Link href="/alexj" className="text-blue-500 hover:underline">View your page</Link>
            <Link href="/account" className="text-blue-500 hover:underline">Account settings</Link>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Links</h2>
            <AnimatePresence>
              {links.map(link => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg mb-4"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">{link.icon}</span>
                    <div>
                      <h3 className="font-semibold">{link.title}</h3>
                      <p className="text-sm text-gray-500">{link.url}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeLink(link.id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <form onSubmit={addLink} className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Link</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Title"
                value={newLink.title}
                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="url"
                placeholder="URL"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Icon (emoji)"
                value={newLink.icon}
                onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Link
            </button>
          </form>
        </div>
        <div className="text-center">
          <button className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-300">
            <Save className="w-5 h-5 inline-block mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

