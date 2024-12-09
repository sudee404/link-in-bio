'use client'

import Loader from '@/components/ui/loader';
import { toast } from '@/hooks/use-toast';
import {  useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react'

export default function BusinessSettingsPage() {
  const { data: session } = useSession()
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient()
  const [business, setBusiness] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notify: true, // Added a toggle for notifications
  })

  const { data: { business: contextData } = {}, isLoading } = useSuspenseQuery({
    queryKey: ["user-business"],
    queryFn: async () => session ? 
      await axios.get("/api/auth/business").then((res) => res?.data) : {},
  });
  useEffect(() => {
    // Pre-fill the form with context data
    if (contextData) {
      setBusiness({
        name: contextData?.name || "",
        email: contextData?.email || "",
        phone: contextData?.phone || "",
        address: contextData?.address || "",
        notify: true, // Added a toggle for notifications
      });
    }
  }, [contextData]);
  const handleSubmit = async () => {
    setSaving(true);
    // recreate data without image , username and email

    const { notify, ...rest } = business;
    const formData = { ...rest };

    await axios.post("/api/auth/business", formData).then((res) => {
      toast({
        title: "Business updated",
        description: "Your business has been updated successfully",
        duration: 3000,
      })
      queryClient.invalidateQueries({ queryKey: ["user-business"] });
    }).catch((err) => {
      console.log(err);
      toast({
        title: "Error",
        description: err?.message,
        duration: 3000,
        variant: "destructive",
      })
    }).finally(() => {
      setSaving(false);
    });

  }

  if (isLoading) {
    return <Loader />
  }
  return (
    <div className="shadow-lg border rounded-lg overflow-hidden">
      {/* Business Header */}
      <div className="p-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">{business?.name}</h1>
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
              value={business?.name}
              onChange={(e) =>
                setBusiness({ ...business, name: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>

          {/* Business Email */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">Business Email</label>
            <input
              type="email"
              value={business?.email}
              onChange={(e) =>
                setBusiness({ ...business, email: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>

          {/* Business Phone */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">Business Phone</label>
            <input
              type="text"
              value={business?.phone}
              onChange={(e) =>
                setBusiness({ ...business, phone: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>

          {/* Business Address */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">Business Address</label>
            <input
              type="text"
              value={business?.address}
              onChange={(e) =>
                setBusiness({ ...business, address: e.target.value })
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
                checked={business?.notify}
                onChange={(e) =>
                  setBusiness({ ...business, notify: e.target.checked })
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
      <button className="mt-4 w-full p-3 bg-blue-500 text-white rounded-lg" disabled={saving} onClick={handleSubmit}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  )
}
