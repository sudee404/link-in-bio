'use client'

import { useState } from 'react'

export default function BusinessSettingsPage() {
  const [business, setBusiness] = useState({
    businessName: "AutoFyle Inc.",
    businessEmail: "contact@autofyle.com",
    businessPhone: "+1234567890",
    businessAddress: "123 Business St, City, Country",
    notificationsEnabled: true, // Added a toggle for notifications
  })

  return (
    <div className="shadow-lg border rounded-lg overflow-hidden">
      {/* Business Header */}
      <div className="p-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">{business.businessName}</h1>
          <button className="text-blue-500 mt-1">Preview Business</button>
        </div>
      </div>

      {/* Business Information */}
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Business Details</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Business Name */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">Business Name</label>
            <input
              type="text"
              value={business.businessName}
              onChange={(e) =>
                setBusiness({ ...business, businessName: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>

          {/* Business Email */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">Business Email</label>
            <input
              type="email"
              value={business.businessEmail}
              onChange={(e) =>
                setBusiness({ ...business, businessEmail: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>

          {/* Business Phone */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">Business Phone</label>
            <input
              type="text"
              value={business.businessPhone}
              onChange={(e) =>
                setBusiness({ ...business, businessPhone: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>

          {/* Business Address */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">Business Address</label>
            <input
              type="text"
              value={business.businessAddress}
              onChange={(e) =>
                setBusiness({ ...business, businessAddress: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>

          {/* Notifications */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">Enable Notifications</label>
            <div className="mt-1 flex items-center">
              <input
                type="checkbox"
                checked={business.notificationsEnabled}
                onChange={(e) =>
                  setBusiness({ ...business, notificationsEnabled: e.target.checked })
                }
                className="h-5 w-5 border-gray-300 rounded-lg"
              />
              <span className="ml-2 text-gray-700">Yes, I want to receive notifications</span>
            </div>
          </div>
        </div>
      </div>

      {/* Business Settings */}
      <div className="p-6 border-t border-gray-200">
        <button className="mt-4 w-full p-3 bg-blue-500 text-white rounded-lg">
          Save Business Settings
        </button>
      </div>
    </div>
  )
}
