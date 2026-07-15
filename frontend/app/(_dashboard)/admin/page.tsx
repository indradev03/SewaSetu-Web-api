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
  Package,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Gift,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { getAdminDashboardApi, DashboardStats } from "@/app/lib/api/admin.api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

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
      label: "Total Donations",
      value: stats?.totalDonations,
      icon: Package,
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
    {
      label: "Active Rewards",
      value: stats?.activeRewards,
      icon: Gift,
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
  ];

  // Prepare data for charts
  const donationStatusData = stats
    ? [
        { name: "Approved", value: stats.approvedDonations, color: "#10b981" },
        { name: "Rejected", value: stats.rejectedDonations, color: "#ef4444" },
        { name: "Pending", value: stats.pendingDonations, color: "#f59e0b" },
        {
          name: "Completed",
          value: stats.completedDonations,
          color: "#3b82f6",
        },
      ].filter((item) => item.value > 0)
    : [];

  const ngoStatusData = stats
    ? [
        { name: "Verified", value: stats.verifiedNGOs, color: "#10b981" },
        { name: "Pending", value: stats.pendingNGOs, color: "#f59e0b" },
      ].filter((item) => item.value > 0)
    : [];

  const rewardStatusData = stats
    ? [
        { name: "Active", value: stats.activeRewards, color: "#10b981" },
        { name: "Inactive", value: stats.inactiveRewards, color: "#64748b" },
      ].filter((item) => item.value > 0)
    : [];

  const overviewData = stats
    ? [
        { name: "Donors", value: stats.totalDonors, color: "#10b981" },
        { name: "NGOs", value: stats.totalNGOs, color: "#3b82f6" },
        { name: "Donations", value: stats.totalDonations, color: "#8b5cf6" },
        { name: "Rewards", value: stats.activeRewards, color: "#f59e0b" },
      ].filter((item) => item.value > 0)
    : [];

  return (
    <div className="w-full space-y-8 py-8 px-2  animate-in fade-in duration-500 max-w-8xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Hero Banner */}
      <div className="bg-linear-to-r from-emerald-950 to-emerald-900 rounded-4xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-950/5 relative overflow-hidden">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {cards.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.label}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm shadow-slate-100/50 hover:shadow-md hover:border-slate-200/60 transition-all duration-300 flex items-center gap-4"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 ${item.color}`}
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donation Status Pie Chart */}
        <div className="bg-white rounded-4xl border border-slate-100 shadow-sm shadow-slate-100/40 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Donation Status
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Overview of donation statuses
              </p>
            </div>
          </div>
          {donationStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={donationStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {donationStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
              No donation data available
            </div>
          )}
        </div>

        {/* NGO Status Pie Chart */}
        <div className="bg-white rounded-4xl border border-slate-100 shadow-sm shadow-slate-100/40 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                NGO Verification Status
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Verified vs pending NGOs
              </p>
            </div>
          </div>
          {ngoStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={ngoStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ngoStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
              No NGO data available
            </div>
          )}
        </div>

        {/* Reward Status Pie Chart */}
        <div className="bg-white rounded-4xl border border-slate-100 shadow-sm shadow-slate-100/40 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
              <Gift className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Reward Status
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Active vs inactive rewards
              </p>
            </div>
          </div>
          {rewardStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={rewardStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {rewardStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
              No reward data available
            </div>
          )}
        </div>

        {/* Platform Overview Bar Chart */}
        <div className="bg-white rounded-4xl border border-slate-100 shadow-sm shadow-slate-100/40 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Platform Overview
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Total counts across platform
              </p>
            </div>
          </div>
          {overviewData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={overviewData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
              No overview data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
