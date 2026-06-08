"use client";

import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "@/app/lib/cookies";

export default function DonorDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("role");
    deleteCookie("userId");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex flex-col items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-lg p-10 max-w-lg w-full text-center space-y-6">

        {/* Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#2D6A2D">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Donor Dashboard</h1>
          <p className="text-sm text-gray-500 mt-2">
            Welcome! You&apos;re successfully logged in as a donor.
          </p>
        </div>

        {/* Dummy stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Donations", value: "0" },
            { label: "NGOs Helped", value: "0" },
            { label: "Items Shared", value: "0" },
          ].map((stat) => (
            <div key={stat.label} className="bg-green-50 rounded-2xl p-4">
              <p className="text-2xl font-bold text-green-700">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400">
          This is a placeholder dashboard. Full features coming soon.
        </p>

        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-xl border border-red-200 text-red-600 text-sm font-medium
            hover:bg-red-50 transition"
        >
          Log out
        </button>
      </div>
    </div>
  );
}