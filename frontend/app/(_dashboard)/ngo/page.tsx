"use client";

import { useRouter } from "next/navigation";
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
} from "lucide-react";
import Button from "@/app/components/ui/button";

export default function NGODashboard() {
  const router = useRouter();

  const metrics = [
    {
      label: "Available to Claim",
      value: "24 Items",
      icon: Package,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      label: "My Claimed",
      value: "8 Active",
      icon: Handshake,
      color: "text-green-600 bg-green-50 border-green-100",
    },
    {
      label: "Completed Pickups",
      value: "15 Done",
      icon: Truck,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
  ];

  const recentClaims = [
    {
      id: "claim-1",
      items: "15x Unused Warm Woolen Blankets",
      category: "Disaster Relief / Bedding",
      donor: "John Doe",
      date: "Claimed Today, 2:30 PM",
      status: "Claimed",
      statusDesc: "Ready for pickup coordination",
      statusStyle: "text-green-700 bg-green-50/80 border-green-200/60",
      icon: CheckCircle2,
    },
    {
      id: "claim-2",
      items: "3x Refurbished Desktop Computers",
      category: "Education / Digital Literacy",
      donor: "Jane Smith",
      date: "Claimed Yesterday",
      status: "Picked Up",
      statusDesc: "Items collected, delivering to beneficiaries",
      statusStyle: "text-emerald-700 bg-emerald-50/80 border-emerald-200/60",
      icon: Truck,
    },
    {
      id: "claim-3",
      items: "Box of Basic School Supplies",
      category: "Primary Education",
      donor: "Mike Johnson",
      date: "Claimed June 15, 2026",
      status: "Completed",
      statusDesc: "Successfully delivered to community center",
      statusStyle: "text-purple-700 bg-purple-50/80 border-purple-200/60",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="w-full space-y-8 py-8 px-2 md:px-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
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
            {recentClaims.map((claim) => {
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
            })}
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
