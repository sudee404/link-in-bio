import { useState } from "react";

export default function PasswordUpdate() {

    const [user, setUser] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    return (
        <div className="p-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold">Change Password</h2>
            <div className="mb-4">
                <label className="text-sm font-medium text-gray-700">
                    New Password
                </label>
                <input
                    type="password"
                    value={user.newPassword}
                    onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
                    placeholder="Enter your new password"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                />
            </div>
            <div className="mb-4">
                <label className="text-sm font-medium text-gray-700">
                    Confirm New Password
                </label>
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
            <button className="mt-4 w-full p-3 bg-blue-500 text-white rounded-lg">
                Update Password
            </button>
        </div>
    )
}