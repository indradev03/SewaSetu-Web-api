"use client";

import Image from "next/image";
import donorImage from "@/app/assets/donor-role-selection.png";
import ngoimage from "@/app/assets/ngo-role-selection.png";
import ButtonLink from "@/app/components/ui/ButtonLink";

const HeartIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-emerald-600"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const NGOIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-emerald-600"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);

export default function RoleSelection() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center mt-10 justify-center px-4 py-16  text-slate-800 antialiased">
      {/* Top Header Block */}
      <div className="text-center mb-6 space-y-3 max-w-full mx-auto px-4">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight whitespace-nowrap text-center justify-center flex items-center w-full">
          <span>
            Join the{" "}
            <span className=" bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              SewaSetu
            </span>{" "}
            Movement
          </span>
        </h1>
        <p className="text-sm md:text-base text-slate-500 max-w-md mx-auto leading-relaxed text-center">
          Connecting hearts and bridging gaps. Select your baseline user
          ecosystem gateway.
        </p>
      </div>

      {/* Main Structural Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-2">
        {/* Card Component 1: Donor */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-300/40 hover:-translate-y-1 group">
          {/* Cover Media Container */}
          <div className="relative w-full h-52 bg-slate-50 border-b border-slate-100 overflow-hidden">
            <Image
              src={donorImage}
              alt="Donor donation track"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-103"
              priority
            />
          </div>

          {/* Action Information Payload */}
          <div className="flex flex-col flex-1 items-center text-center p-6 sm:p-8 justify-between gap-6">
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-inner">
                <HeartIcon />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Become a Donor
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
                  Share food, clothes, and vital logistics essentials directly
                  with targeted local families.
                </p>
              </div>
            </div>

            {/* Direct Link Action Button Block */}
            <div className="w-full pt-2">
              <ButtonLink
                href="/register/donor"
                variant="green"
                className="w-full block text-center font-bold px-6 py-4 rounded-xl shadow-md bg-emerald-600 hover:bg-emerald-700 text-white transition-all text-sm tracking-wide active:scale-[0.99]"
              >
                Start Giving
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Card Component 2: NGO */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-300/40 hover:-translate-y-1 group">
          {/* Cover Media Container */}
          <div className="relative w-full h-52 bg-slate-50 border-b border-slate-100 overflow-hidden">
            <Image
              src={ngoimage}
              alt="NGO infrastructure framework"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-103"
              priority
            />
          </div>

          {/* Action Information Payload */}
          <div className="flex flex-col flex-1 items-center text-center p-6 sm:p-8 justify-between gap-6">
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-inner">
                <NGOIcon />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Register as NGO
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
                  Deploy infrastructure campaigns and distribute validated items
                  across trusted ecosystem nodes.
                </p>
              </div>
            </div>

            {/* Direct Link Action Button Block */}
            <div className="w-full pt-2">
              <ButtonLink
                href="/register/ngo"
                variant="orange"
                className="w-full block text-center font-bold px-6 py-4 rounded-xl shadow-md bg-emerald-600 hover:bg-emerald-700 text-white transition-all text-sm tracking-wide active:scale-[0.99]"
              >
                Register NGO
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
