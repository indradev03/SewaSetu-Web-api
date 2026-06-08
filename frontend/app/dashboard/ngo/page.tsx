"use client";

import { useRouter } from "next/navigation";
import { deleteCookie } from "@/app/lib/cookies";

export default function NGODashboard() {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("role");
    deleteCookie("userId");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-lg p-10 max-w-lg w-full text-center space-y-6">

        {/* Icon */}
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#3B5BDB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            <line x1="12" y1="12" x2="12" y2="16" />
            <line x1="10" y1="14" x2="14" y2="14" />
          </svg>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">NGO Dashboard</h1>
          <p className="text-sm text-gray-500 mt-2">
            Welcome! Your NGO is registered and pending verification.
          </p>
        </div>

        {/* Status badge */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
          <p className="text-sm font-semibold text-yellow-700">⏳ Verification Pending</p>
          <p className="text-xs text-gray-500 mt-1">
            An admin will review your documents and approve your NGO.
          </p>
        </div>

        {/* Dummy stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Donations Received", value: "0" },
            { label: "Donors", value: "0" },
            { label: "Campaigns", value: "0" },
          ].map((stat) => (
            <div key={stat.label} className="bg-blue-50 rounded-2xl p-4">
              <p className="text-2xl font-bold text-blue-700">{stat.value}</p>
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