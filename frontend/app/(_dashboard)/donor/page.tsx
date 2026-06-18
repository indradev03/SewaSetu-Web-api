"use client";

import { useRouter } from "next/navigation";
import { deleteCookie } from "@/app/lib/cookies";

export default function DonorHome() {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("role");
    deleteCookie("userId");
    router.push("/login");
  };

  return (
    <div className="min-h-screen p-6 md:ml-64">
      {/* Page Container */}
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#2D6A2D">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold mt-4">Donor Dashboard</h1>
          <p className="text-sm text-gray-500 mt-2">
            Welcome! You’re successfully logged in as a donor.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Donations", value: "0" },
            { label: "NGOs Helped", value: "0" },
            { label: "Items Shared", value: "0" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl shadow p-6 text-center"
            >
              <p className="text-3xl font-bold text-green-700">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div className="bg-white rounded-2xl shadow p-6">
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-xl border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
