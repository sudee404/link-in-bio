"use client";

import { Fragment, useState } from "react";
import { motion } from "motion/react";
import { sampleUser } from "@/lib/sample-data";
import Link from "next/link";

export default function AccountPage() {
  const [user, setUser] = useState(sampleUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this data to your backend
    console.log("Updated user:", user);
  };

  return (
    <Fragment>
      {" "}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-6 mb-8"
      >
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bio
            </label>
            <textarea
              id="bio"
              value={user.bio}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Avatar URL
            </label>
            <input
              type="url"
              id="avatar"
              value={user.avatar}
              onChange={(e) => setUser({ ...user, avatar: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Save Changes
            </button>
            <Link href="/dashboard" className="text-blue-500 hover:underline">
              Back to Dashboard
            </Link>
          </div>
        </form>
      </motion.div>
    </Fragment>
  );
}
