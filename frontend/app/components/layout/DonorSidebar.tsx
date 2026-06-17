"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Home,
  User,
  History,
  LogOut,
  X,
  HeartHandshake,
  Gift,
  Info,
  Menu,
} from "lucide-react";
import { deleteCookie } from "@/app/lib/cookies";

const DonorSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const user = {
    name: "Adiwara Bestari",
    email: "adiwara@example.com",
    image: "/profile.jpg",
  };

  const navLinks = [
    { name: "Home", path: "/donor", icon: Home },
    {
      name: "Create Donation",
      path: "/donor/create-donation",
      icon: HeartHandshake,
    },
    { name: "Donation History", path: "/donor/history", icon: History },
    { name: "Rewards", path: "/donor/rewards", icon: Gift },
    { name: "About", path: "/donor/about", icon: Info },
    { name: "Profile", path: "/donor/profile", icon: User },
  ];

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("role");
    deleteCookie("userId");
    router.push("/login");
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-md md:hidden transition-opacity duration-300 z-40 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 h-screen w-76 bg-white border-r border-slate-100 flex flex-col
        transform transition-transform duration-300 ease-out z-50
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* BRAND HEADER */}
        <div className="pt-8 px-7 pb-5">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/donor/dashboard"
              className="flex items-center gap-3 active:scale-95 transition-transform"
            >
              <Image
                src="/logo.png"
                alt="SewaSetu Logo"
                width={130}
                height={36}
                className="object-contain"
                priority
              />
            </Link>

            <button
              onClick={() => setOpen(false)}
              className="md:hidden text-slate-400 hover:text-slate-600 hover:bg-slate-50 p-2 rounded-xl transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* MINIMALIST USER PROFILE CARD */}
          <div className="flex items-center gap-3.5 bg-slate-50/70 border border-slate-100/50 p-3.5 rounded-2xl group transition-all duration-300 hover:bg-slate-50">
            <div className="relative w-11 h-11 flex-shrink-0 rounded-full ring-2 ring-white shadow-sm overflow-hidden">
              <Image
                src={user.image}
                alt="User avatar"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[15px] text-slate-800 tracking-tight truncate">
                {user.name}
              </p>
              <p className="text-xs text-slate-400 tracking-wide truncate mt-0.5">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navLinks.map(({ name, path, icon: Icon }) => {
            const active = isActive(path);

            return (
              <Link
                key={path}
                href={path}
                onClick={() => setOpen(false)}
                className={`relative flex items-center gap-3.5 px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-200 group
                ${
                  active
                    ? "bg-emerald-50 text-emerald-700 font-semibold"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                {/* Active Indicator Line */}
                {active && (
                  <span className="absolute left-0 top-1/4 h-1/2 w-1 bg-emerald-600 rounded-r-full" />
                )}

                <Icon
                  size={19}
                  className={`transition-transform duration-200 group-hover:scale-105 stroke-[2] ${
                    active
                      ? "text-emerald-600"
                      : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>

        {/* FOOTER & SIGN OUT */}
        <div className="p-4 border-t border-slate-50">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50/60 border border-transparent w-full px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-200 group"
          >
            <LogOut
              size={17}
              className="text-slate-400 group-hover:text-red-500 transition-colors stroke-[2]"
            />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MOBILE MENU TRIGGER */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 md:hidden bg-white text-slate-700 shadow-sm border border-slate-200/60 p-2.5 rounded-xl z-30 hover:bg-slate-50 active:scale-95 transition-all"
      >
        <Menu size={20} />
      </button>
    </>
  );
};

export default DonorSidebar;
