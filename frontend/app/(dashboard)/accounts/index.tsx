'use client'

import { useState } from 'react'

export default function ProfilePage() {
  const [user, setUser] = useState({
    firstName: "Jamie",
    lastName: "Jones",
    email: "jjones@autofyle.com",
    recoveryEmail: "",
    username: "jamiejones",
    avatar: "https://via.placeholder.com/150",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    accountType: "Standard", // Added account type field
  })

  return (
    <div className="shadow-lg border rounded-lg overflow-hidden">
      {/* Profile Header */}
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <button
              className="absolute bottom-1 right-1 p-2 rounded-full bg-gray-800 text-white"
            >
              <i className="fas fa-camera"></i>
            </button>
          </div>
          <div>
            <h1 className="text-xl font-bold">{user.firstName} {user.lastName}</h1>
            <button className="text-blue-500 mt-1">Preview Profile</button>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Account</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* First Name */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              value={user.firstName}
              onChange={(e) =>
                setUser({ ...user, firstName: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>

          {/* Last Name */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              value={user.lastName}
              onChange={(e) =>
                setUser({ ...user, lastName: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>

          {/* Email */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
              disabled
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            />
            <button className="text-blue-500 mt-1">Change</button>
          </div>

          {/* Username */}
          <div className="sm:col-span-2 w-full">
            <label className="text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={`https://platform.com/u/${user.username}`}
              onChange={(e) =>
                setUser({ ...user, username: e.target.value })
              }
              disabled
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>

          {/* Account Type */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">Account Type</label>
            <select
              value={user.accountType}
              onChange={(e) =>
                setUser({ ...user, accountType: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            >
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Recovery Email */}
          <div className="sm:col-span-2 w-full">
            <label className="text-sm font-medium text-gray-700">Recovery Email Address</label>
            <input
              type="email"
              value={user.recoveryEmail}
              onChange={(e) =>
                setUser({ ...user, recoveryEmail: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            />
            <button className="text-blue-500 mt-1">Save Recovery Email</button>
          </div>
        </div>
      </div>

      {/* Password Update */}
      <div className="p-6 border-t border-gray-200">
        <h2 className="text-lg font-semibold">Change Password</h2>
        
        {/* Current Password */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            value={user.currentPassword}
            onChange={(e) =>
              setUser({ ...user, currentPassword: e.target.value })
            }
            placeholder="Enter your current password"
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
          />
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            value={user.newPassword}
            onChange={(e) =>
              setUser({ ...user, newPassword: e.target.value })
            }
            placeholder="Enter your new password"
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
          />
        </div>

        {/* Confirm New Password */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
          <input
            type="password"
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
            placeholder="Confirm your new password"
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
          />
        </div>

        <button className="mt-4 w-full p-3 bg-blue-500 text-white rounded-lg">Update Password</button>
      </div>
    </div>
  )
}
