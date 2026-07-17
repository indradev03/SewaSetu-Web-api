"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Package,
  Handshake,
  Gift,
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
  getDonorProfileApi,
  getDonorStatisticsApi,
  getRecentDonationsApi,
  type DonorStatistics,
  type Donation,
} from "@/app/lib/api/donor.api";
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

export default function DonorDashboardHome() {
  const router = useRouter();
  const [rewardPoints, setRewardPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<DonorStatistics | null>(null);
  const [recentDonations, setRecentDonations] = useState<Donation[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [profileRes, statsRes, recentRes] = await Promise.all([
        getDonorProfileApi(),
        getDonorStatisticsApi(),
        getRecentDonationsApi(5),
      ]);

      setRewardPoints(profileRes.data.rewardPoints || 0);
      setStatistics(statsRes.data);
      setRecentDonations(recentRes.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  const metrics = [
    {
      label: "Total Donations",
      value: loading ? "..." : statistics?.totalDonations || 0,
      icon: Package,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      label: "Accepted Donations",
      value: loading ? "..." : statistics?.acceptedDonations || 0,
      icon: Handshake,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      label: "Reward Points",
      value: loading ? "..." : statistics?.totalRewardPoints || 0,
      icon: Gift,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
  ];

  // Prepare data for charts
  const statusData = statistics
    ? [
        {
          name: "Completed",
          value: statistics.completedDonations,
          color: "#10b981",
        },
        {
          name: "Pending",
          value: statistics.pendingDonations,
          color: "#f59e0b",
        },
        {
          name: "Rejected",
          value: statistics.rejectedDonations,
          color: "#ef4444",
        },
      ].filter((item) => item.value > 0)
    : [];

  const monthlyData = recentDonations.reduce(
    (acc, donation) => {
      const date = new Date(donation.createdAt);
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

  const openDonationRequests = recentDonations.map((donation) => {
    const date = new Date(donation.createdAt);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    let status, statusDesc, statusStyle, icon;

    if (donation.status === "Completed") {
      status = "Completed";
      statusDesc = "Successfully delivered and completed";
      statusStyle = "text-emerald-700 bg-emerald-50/80 border-emerald-200/60";
      icon = CheckCircle2;
    } else if (
      donation.status === "Claimed" ||
      donation.status === "PickedUp"
    ) {
      status = "In Progress";
      statusDesc = donation.claimedByNgo?.organizationName
        ? `Accepted by ${donation.claimedByNgo.organizationName}`
        : "Coordinating logistics";
      statusStyle = "text-blue-700 bg-blue-50/80 border-blue-200/60";
      icon = CheckCircle2;
    } else if (donation.adminStatus === "Pending") {
      status = "Pending Approval";
      statusDesc = "Awaiting admin review";
      statusStyle = "text-amber-700 bg-amber-50/80 border-amber-200/60";
      icon = Clock;
    } else if (donation.adminStatus === "Rejected") {
      status = "Rejected";
      statusDesc = donation.adminRejectionReason || "Not approved";
      statusStyle = "text-red-700 bg-red-50/80 border-red-200/60";
      icon = AlertCircle;
    } else {
      status = "Available";
      statusDesc = "Visible on the public board for matching non-profits";
      statusStyle = "text-emerald-700 bg-emerald-50/80 border-emerald-200/60";
      icon = Search;
    }

    return {
      id: donation._id,
      items: `${donation.quantity}x ${donation.title}`,
      category: donation.category,
      date: `Posted ${formattedDate}`,
      status,
      statusDesc,
      statusStyle,
      icon,
      acceptedBy: donation.claimedByNgo?.organizationName,
    };
  });

  return (
    <div className="w-full space-y-8 py-8 px-2  animate-in fade-in duration-500 max-w-8xl mx-auto">
      {/* 1. Dynamic Premium Hero Banner */}
      <div className="bg-linear-to-r from-emerald-950 to-emerald-900 rounded-4xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-950/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_45%)]" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative z-10">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 bg-emerald-900/60 px-2.5 py-1 rounded-md border border-emerald-800/40 inline-block">
              SewaSetu Request Engine
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Post Available Resources
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/70 max-w-md font-medium leading-relaxed">
              List the physical items you want to spare. Local verified NGOs
              will look through your listing and claim it based on their
              immediate programmatic requirements.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              variant="green"
              onClick={() => router.push("/donor/create-donation")}
              className="w-full sm:w-auto font-bold px-7 py-4 rounded-2xl shadow-lg shadow-emerald-500/20 bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-sm"
            >
              Create Donation Post
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
        {/* Donation Status Pie Chart */}
        <div className="bg-white rounded-4xl border border-slate-100 shadow-sm shadow-slate-100/40 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Donation Status
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Overview of your donation statuses
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
              No donation data available
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
                Your donation activity over time
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
        {/* Left Side: Pipeline Intake Monitoring Board */}
        <div className="lg:col-span-8 bg-white rounded-4xl border border-slate-100 shadow-sm shadow-slate-100/40 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Recent Donation History
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Monitor your recent donations and their status.
              </p>
            </div>
            <button
              onClick={() => router.push("/donor/history")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 px-3.5 py-2 rounded-xl transition-all duration-200"
            >
              All Submissions
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100/80">
            {openDonationRequests.length > 0 ? (
              openDonationRequests.map((req) => {
                const StateIcon = req.icon;
                return (
                  <div
                    key={req.id}
                    className="p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-5 hover:bg-slate-50/40 transition-all duration-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-slate-500 mt-0.5 shadow-inner">
                        <StateIcon className="w-5 h-5 text-slate-600" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm md:text-base font-bold text-slate-800 tracking-tight leading-snug">
                            {req.items}
                          </h4>
                          <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2.5 py-0.5 rounded-md border border-slate-200/40">
                            {req.category}
                          </span>
                        </div>

                        {req.acceptedBy ? (
                          <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                            Accepted by:{" "}
                            <span className="text-blue-600 font-bold hover:underline cursor-pointer transition">
                              {req.acceptedBy}
                            </span>
                          </p>
                        ) : (
                          <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                            <Search className="w-3.5 h-3.5 text-amber-500" />{" "}
                            {req.statusDesc}
                          </p>
                        )}

                        <span className="text-[11px] text-slate-400 block font-medium">
                          {req.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 shrink-0">
                      <span
                        className={`text-[10px] px-3 py-1 font-extrabold rounded-full border tracking-wider uppercase ${req.statusStyle}`}
                      >
                        {req.status}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-12 text-center">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-sm text-slate-500 font-medium">
                  No donations yet
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Create your first donation to get started
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Structural System Guidelines and Incentives */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Informational System Guide Context */}
          <div className="bg-white rounded-4xl border border-slate-100 p-6 shadow-sm shadow-slate-100/40 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-emerald-600" /> System Guide
            </h3>

            <div className="space-y-4 pt-1">
              <div className="flex gap-3.5 items-start">
                <div className="text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-100 w-6 h-6 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  1
                </div>
                <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                  Create a listing with clean photos, accurate quantities, and
                  condition specifications.
                </p>
              </div>
              <div className="flex gap-3.5 items-start">
                <div className="text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-100 w-6 h-6 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  2
                </div>
                <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                  Verified local NGOs scan open requests and claim items
                  matching their current field deployment.
                </p>
              </div>
              <div className="flex gap-3.5 items-start">
                <div className="text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-100 w-6 h-6 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  3
                </div>
                <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                  Once accepted, coordinate drop-off logistics safely using our
                  structured inline messenger engine.
                </p>
              </div>
            </div>
          </div>

          {/* Premium Gamified Rewards Widget */}
          <div className="bg-linear-to-br from-amber-500/5 via-amber-500/1 to-transparent rounded-4xl border border-amber-500/10 p-6 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white shrink-0 shadow-md shadow-amber-500/10">
                <Gift className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-widest">
                Incentives Active
              </h4>
            </div>
            <p className="text-xs md:text-sm text-amber-900/80 font-medium leading-relaxed">
              When an NGO marks your item request as safely received, your
              account updates automatically with verified civic impact tokens.
            </p>
            <button
              onClick={() => router.push("/donor/rewards")}
              className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-700 hover:text-amber-800 transition group pt-1"
            >
              Open Rewards Store
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
