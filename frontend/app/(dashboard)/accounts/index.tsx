"use client";
import PasswordUpdate from "@/components/forms/password-update";
import { UserContextContext } from "@/context/UserContext";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { user: contextData } = useContext(UserContextContext);
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    recovery_email: "",
    username: "",
    image: "https://via.placeholder.com/150",
    account_type: "personal",
  });

  const handleSubmit = async () => {
    setSaving(true);
    // recreate data without image , username and email

    const { image, username, email, ...rest } = user;
    const formData = { ...rest };

    await axios.post("/api/auth/profile", formData).then((res) => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    }).catch((err) => {
      console.log(err);
      toast.error(err.message);
    }).finally(() => {
      setSaving(false);
    });

  }
  useEffect(() => {
    // Pre-fill the form with context data
    if (contextData) {
      setUser({
        first_name: contextData?.first_name || "",
        last_name: contextData?.last_name || "",
        email: contextData?.email || "",
        recovery_email: contextData?.recovery_email || "",
        username: contextData?.username || "",
        image: contextData?.image || "https://via.placeholder.com/150", // Replace with actual image URL if available
        account_type: contextData?.account_type || "personal",
      });
    }
  }, [contextData]);

  return (
    <div className="shadow-lg border rounded-lg overflow-hidden">
      {/* Profile Header */}
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img
                src={user?.image}
                alt="image"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-1 right-1 p-2 rounded-full bg-gray-800 text-white">
              <i className="fas fa-camera"></i>
            </button>
          </div>
          <div>
            <h1 className="text-xl font-bold">
              {user?.first_name} {user?.last_name}
            </h1>
            <button className="text-blue-500 mt-1" onClick={handleSubmit}>Preview Profile</button>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Account</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* First Name */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={user?.first_name}
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>

          {/* Last Name */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              value={user?.last_name}
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>

          {/* Email */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={user?.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              disabled
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>

          {/* Username */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={user?.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              disabled
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>

          {/* Account Type */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">
              Account Type
            </label>
            <select
              value={user?.account_type}
              onChange={(e) =>
                setUser({ ...user, account_type: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            >
              <option value="business">Business</option>
              <option value="personal">Personal</option>
            </select>
          </div>

          {/* Recovery Email */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">
              Recovery Email Address
            </label>
            <input
              type="email"
              value={user?.recovery_email}
              onChange={(e) =>
                setUser({ ...user, recovery_email: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <button className="mt-4 w-full p-3 bg-blue-500 text-white rounded-lg" disabled={saving} onClick={handleSubmit}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Password Update */}
      <PasswordUpdate />
    </div>
  );
}
