"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  HandHeart,
  ClipboardList,
  BarChart3,
  User,
  LogOut,
} from "lucide-react";
import { deleteCookie } from "@/app/lib/cookies";

const NgoNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", path: "/ngo/dashboard", icon: LayoutDashboard },
    { name: "Requests", path: "/ngo/requests", icon: ClipboardList },
    { name: "Campaigns", path: "/ngo/campaigns", icon: HandHeart },
    { name: "Reports", path: "/ngo/reports", icon: BarChart3 },
    { name: "Profile", path: "/ngo/profile", icon: User },
  ];

  const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("role");
    deleteCookie("userId");
    router.push("/login");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[78%] bg-white/95 backdrop-blur-md border border-gray-200 shadow-md rounded-2xl px-4 md:px-8 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/ngo/dashboard" className="flex items-center gap-2">
          <Image src="/logo.png" alt="SewaSetu NGO" width={110} height={36} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ name, path, icon: Icon }) => (
            <Link
              key={path}
              href={path}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition
                ${
                  isActive(path)
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:text-blue-700 hover:bg-gray-50"
                }`}
            >
              <Icon size={15} />
              {name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Profile quick access */}
          <Link
            href="/ngo/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-full text-sm text-gray-600 hover:bg-gray-100"
          >
            <User size={16} />
            NGO Panel
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-red-500 hover:bg-red-50 transition"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-1 border-t pt-3">
          {navLinks.map(({ name, path, icon: Icon }) => (
            <Link
              key={path}
              href={path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition
                ${
                  isActive(path)
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              <Icon size={16} />
              {name}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 mt-1"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default NgoNavbar;
