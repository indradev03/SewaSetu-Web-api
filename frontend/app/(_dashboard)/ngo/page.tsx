"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Package,
  Handshake,
  Truck,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Calendar,
} from "lucide-react";
import Button from "@/app/components/ui/button";
import {
  getNgoStatisticsApi,
  getRecentNgoClaimsApi,
  type NgoStatistics,
  type NgoDonation,
} from "@/app/lib/api/ngo.api";
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
} from "recharts";

export default function NGODashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<NgoStatistics | null>(null);
  const [recentClaims, setRecentClaims] = useState<NgoDonation[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, recentRes] = await Promise.all([
        getNgoStatisticsApi(),
        getRecentNgoClaimsApi(5),
      ]);

      setStatistics(statsRes.data);
      setRecentClaims(recentRes.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  const metrics = [
    {
      label: "Available to Claim",
      value: loading ? "..." : statistics?.availableDonations || 0,
      icon: Package,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      label: "My Claimed",
      value: loading ? "..." : statistics?.totalClaimed || 0,
      icon: Handshake,
      color: "text-green-600 bg-green-50 border-green-100",
    },
    {
      label: "Completed Pickups",
      value: loading ? "..." : statistics?.completedPickups || 0,
      icon: Truck,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
  ];

  // Prepare data for charts
  const statusData = statistics
    ? [
        {
          name: "Completed",
          value: statistics.completedPickups,
          color: "#10b981",
        },
        { name: "In Progress", value: statistics.inProgress, color: "#3b82f6" },
      ].filter((item) => item.value > 0)
    : [];

  const monthlyData = recentClaims.reduce(
    (acc, claim) => {
      const date = new Date(claim.createdAt);
      const monthKey = date.toLocaleString("default", { month: "short" });
      const existing = acc.find((item) => item.month === monthKey);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ month: monthKey, count: 1 });
      }
      return acc;
    },
    [] as { month: string; count: number }[],
  );

  const recentClaimsList = recentClaims.map((claim) => {
    const date = new Date(claim.createdAt);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    let status, statusDesc, statusStyle, icon;

    if (claim.status === "Completed") {
      status = "Completed";
      statusDesc = "Successfully delivered to community center";
      statusStyle = "text-emerald-700 bg-emerald-50/80 border-emerald-200/60";
      icon = CheckCircle2;
    } else if (claim.status === "PickedUp") {
      status = "Picked Up";
      statusDesc = "Items collected, delivering to beneficiaries";
      statusStyle = "text-blue-700 bg-blue-50/80 border-blue-200/60";
      icon = Truck;
    } else if (claim.status === "Claimed") {
      status = "Claimed";
      statusDesc = "Ready for pickup coordination";
      statusStyle = "text-green-700 bg-green-50/80 border-green-200/60";
      icon = CheckCircle2;
    } else {
      status = "Available";
      statusDesc = "Available for pickup";
      statusStyle = "text-slate-700 bg-slate-50/80 border-slate-200/60";
      icon = Clock;
    }

    return {
      id: claim._id,
      items: `${claim.quantity}x ${claim.title}`,
      category: claim.category,
      donor: claim.donor?.fullName || "Unknown",
      date: `Claimed ${formattedDate}`,
      status,
      statusDesc,
      statusStyle,
      icon,
    };
  });

  return (
    <div className="w-full space-y-8 py-8 px-2  animate-in fade-in duration-500 max-w-8xl mx-auto">
      {/* 1. Dynamic Premium Hero Banner */}
      <div className="bg-linear-to-r from-green-950 to-green-900 rounded-4xl p-6 sm:p-8 text-white shadow-xl shadow-green-950/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,91,219,0.12),transparent_45%)]" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative z-10">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-green-300 bg-green-900/60 px-2.5 py-1 rounded-md border border-green-800/40 inline-block">
              SewaSetu NGO Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Browse Available Donations
            </h1>
            <p className="text-xs sm:text-sm text-green-100/70 max-w-md font-medium leading-relaxed">
              Claim donations from verified donors in your area. Coordinate
              pickups and track delivery status all in one place.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              onClick={() => router.push("/ngo/donations")}
              className="w-full sm:w-auto font-bold px-7 py-4 rounded-2xl shadow-lg shadow-green-500/20 bg-green-500 hover:bg-green-400 text-white flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-sm"
            >
              View Available Donations
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Elevated Core Metrics Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {metrics.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.label}
              className="bg-white rounded-2.5xl border border-slate-100 p-6 shadow-sm shadow-slate-100/50 hover:shadow-md hover:border-slate-200/60 transition-all duration-300 group flex items-center gap-5"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-2 ${item.color} transition-transform duration-300 group-hover:scale-105`}
              >
                <IconComponent className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {item.label}
                </p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Claim Status Pie Chart */}
        <div className="bg-white rounded-4xl border border-slate-100 shadow-sm shadow-slate-100/40 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Claim Status
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Overview of your claim statuses
              </p>
            </div>
          </div>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
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
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
              No claim data available
            </div>
          )}
        </div>

        {/* Monthly Activity Bar Chart */}
        <div className="bg-white rounded-4xl border border-slate-100 shadow-sm shadow-slate-100/40 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Monthly Activity
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Your claiming activity over time
              </p>
            </div>
          </div>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="month"
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
                <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
              No activity data available
            </div>
          )}
        </div>
      </div>

      {/* 3. Operational Real-Estate Layout Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Recent Claims Monitoring Board */}
        <div className="lg:col-span-8 bg-white rounded-4xl border border-slate-100 shadow-sm shadow-slate-100/40 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Your Recent Claims
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Track your claimed donations and their pickup status.
              </p>
            </div>
            <button
              onClick={() => router.push("/ngo/my-claims")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100/80 px-3.5 py-2 rounded-xl transition-all duration-200"
            >
              All Claims
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100/80">
            {recentClaimsList.length > 0 ? (
              recentClaimsList.map((claim) => {
                const StateIcon = claim.icon;
                return (
                  <div
                    key={claim.id}
                    className="p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-5 hover:bg-slate-50/40 transition-all duration-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-slate-500 mt-0.5 shadow-inner">
                        <StateIcon className="w-5 h-5 text-slate-600" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm md:text-base font-bold text-slate-800 tracking-tight leading-snug">
                            {claim.items}
                          </h4>
                          <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2.5 py-0.5 rounded-md border border-slate-200/40">
                            {claim.category}
                          </span>
                        </div>

                        <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                          Donor:{" "}
                          <span className="text-green-600 font-bold">
                            {claim.donor}
                          </span>
                        </p>

                        <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                          <Search className="w-3.5 h-3.5 text-slate-400" />{" "}
                          {claim.statusDesc}
                        </p>

                        <span className="text-[11px] text-slate-400 block font-medium">
                          {claim.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 shrink-0">
                      <span
                        className={`text-[10px] px-3 py-1 font-extrabold rounded-full border tracking-wider uppercase ${claim.statusStyle}`}
                      >
                        {claim.status}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-12 text-center">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-sm text-slate-500 font-medium">
                  No claims yet
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Browse available donations to get started
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Structural System Guidelines */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Informational System Guide Context */}
          <div className="bg-white rounded-4xl border border-slate-100 p-6 shadow-sm shadow-slate-100/40 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-green-600" /> How It Works
            </h3>

            <div className="space-y-4 pt-1">
              <div className="flex gap-3.5 items-start">
                <div className="text-xs font-black text-green-600 bg-green-50 border border-green-100 w-6 h-6 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  1
                </div>
                <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                  Browse available donations from verified donors in your area.
                </p>
              </div>
              <div className="flex gap-3.5 items-start">
                <div className="text-xs font-black text-green-600 bg-green-50 border border-green-100 w-6 h-6 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  2
                </div>
                <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                  Claim donations that match your organization's current needs.
                </p>
              </div>
              <div className="flex gap-3.5 items-start">
                <div className="text-xs font-black text-green-600 bg-green-50 border border-green-100 w-6 h-6 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  3
                </div>
                <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                  Coordinate pickup with the donor and mark as completed when
                  delivered.
                </p>
              </div>
            </div>
          </div>

          {/* Impact Widget */}
          <div className="bg-linear-to-br from-green-500/5 via-green-500/1 to-transparent rounded-4xl border border-green-500/10 p-6 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-24 h-24 bg-green-500/5 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center text-white shrink-0 shadow-md shadow-green-500/10">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-green-950 uppercase tracking-widest">
                Your Impact
              </h4>
            </div>
            <p className="text-xs md:text-sm text-green-900/80 font-medium leading-relaxed">
              Every donation you claim helps communities in need. Track your
              impact through your claims history.
            </p>
            <button
              onClick={() => router.push("/ngo/my-claims")}
              className="inline-flex items-center gap-1 text-xs font-extrabold text-green-700 hover:text-green-800 transition group pt-1"
            >
              View All Claims
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
