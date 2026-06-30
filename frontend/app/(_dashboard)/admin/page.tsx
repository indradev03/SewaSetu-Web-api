"use client";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Users,
  HeartHandshake,
  ShieldCheck,
  BadgeCheck,
  Clock,
} from "lucide-react";
import { getAdminDashboardApi, DashboardStats } from "@/app/lib/api/admin.api";

export default function AdminDashboardHome() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAdminDashboardApi();
        setStats(res.data);
      } catch (err) {
        toast.error("Failed to load dashboard stats.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const cards = [
    {
      label: "Total Donors",
      value: stats?.totalDonors,
      icon: Users,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      label: "Total NGOs",
      value: stats?.totalNGOs,
      icon: HeartHandshake,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      label: "Verified NGOs",
      value: stats?.verifiedNGOs,
      icon: BadgeCheck,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      label: "Pending NGOs",
      value: stats?.pendingNGOs,
      icon: Clock,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
  ];

  return (
    <div className="w-full space-y-8 py-8 px-2 md:px-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 rounded-[2rem] p-6 sm:p-8 text-white shadow-xl shadow-emerald-950/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_45%)]" />

        <div className="relative z-10 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 bg-emerald-900/60 px-2.5 py-1 rounded-md border border-emerald-800/40 inline-block">
            SewaSetu Admin
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Platform Overview
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/70 max-w-md font-medium leading-relaxed">
            Track donors, NGOs, and verification status across the platform.
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {cards.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.label}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm shadow-slate-100/50 hover:shadow-md hover:border-slate-200/60 transition-all duration-300 flex items-center gap-4"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 ${item.color}`}
              >
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {item.label}
                </p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">
                  {loading ? "—" : (item.value ?? 0)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
