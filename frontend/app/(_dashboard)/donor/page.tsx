"use client";

import { useRouter } from "next/navigation";
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
} from "lucide-react";
import Button from "@/app/components/ui/button";

export default function DonorDashboardHome() {
  const router = useRouter();

  const metrics = [
    {
      label: "Your Total Posts",
      value: "12 Listings",
      icon: Package,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      label: "Accepted by NGOs",
      value: "9 Matches",
      icon: Handshake,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      label: "Earned Rewards",
      value: "340 pts",
      icon: Gift,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
  ];

  const openDonationRequests = [
    {
      id: "req-1",
      items: "15x Unused Warm Woolen Blankets",
      category: "Disaster Relief / Bedding",
      date: "Posted Today, 11:30 AM",
      status: "Awaiting NGO",
      statusDesc: "Visible on the public board for matching non-profits",
      statusStyle: "text-amber-700 bg-amber-50/80 border-amber-200/60",
      icon: Clock,
    },
    {
      id: "req-2",
      items: "3x Refurbished Desktop Computers",
      category: "Education / Digital Literacy",
      date: "Posted 2 days ago",
      status: "Accepted by NGO",
      acceptedBy: "Shiksha Nepal Foundation",
      statusDesc: "Coordinating logistics and package drop-off details",
      statusStyle: "text-emerald-700 bg-emerald-50/80 border-emerald-200/60",
      icon: CheckCircle2,
    },
    {
      id: "req-3",
      items: "Box of Basic School Supplies (Notebooks, Pens)",
      category: "Primary Education",
      date: "Posted June 14, 2026",
      status: "Accepted by NGO",
      acceptedBy: "Youth Empowerment Club",
      statusDesc: "Coordinating logistics and package drop-off details",
      statusStyle: "text-emerald-700 bg-emerald-50/80 border-emerald-200/60",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="w-full space-y-8 py-8 px-2 md:px-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      {/* 1. Dynamic Premium Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 rounded-[2rem] p-6 sm:p-8 text-white shadow-xl shadow-emerald-950/5 relative overflow-hidden">
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

          <div className="flex-shrink-0">
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
                className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 ${item.color} transition-transform duration-300 group-hover:scale-105`}
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

      {/* 3. Operational Real-Estate Layout Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Pipeline Intake Monitoring Board */}
        <div className="lg:col-span-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm shadow-slate-100/40 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Your Custom Requests Panel
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Monitor open posts and see which non-profit foundations have
                accepted them.
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
            {openDonationRequests.map((req) => {
              const StateIcon = req.icon;
              return (
                <div
                  key={req.id}
                  className="p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-5 hover:bg-slate-50/40 transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 text-slate-500 mt-0.5 shadow-inner">
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

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 flex-shrink-0">
                    <span
                      className={`text-[10px] px-3 py-1 font-extrabold rounded-full border tracking-wider uppercase ${req.statusStyle}`}
                    >
                      {req.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Structural System Guidelines and Incentives */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Informational System Guide Context */}
          <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm shadow-slate-100/40 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-emerald-600" /> System Guide
            </h3>

            <div className="space-y-4 pt-1">
              <div className="flex gap-3.5 items-start">
                <div className="text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-100 w-6 h-6 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  1
                </div>
                <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                  Create a listing with clean photos, accurate quantities, and
                  condition specifications.
                </p>
              </div>
              <div className="flex gap-3.5 items-start">
                <div className="text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-100 w-6 h-6 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  2
                </div>
                <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                  Verified local NGOs scan open requests and claim items
                  matching their current field deployment.
                </p>
              </div>
              <div className="flex gap-3.5 items-start">
                <div className="text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-100 w-6 h-6 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
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
          <div className="bg-gradient-to-br from-amber-500/5 via-amber-500/[0.01] to-transparent rounded-[2rem] border border-amber-500/10 p-6 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-amber-500/10">
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
