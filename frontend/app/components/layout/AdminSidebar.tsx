"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import {
  LayoutDashboard,
  Users,
  HeartHandshake,
  LogOut,
  X,
  Menu,
  ShieldCheck,
  Gift,
} from "lucide-react";
import { getDonorByIdApi } from "@/app/lib/api/admin.api";
import { getCookie } from "@/app/lib/cookies";
import { useAuth } from "@/app/lib/context/AuthContext";

type AdminUser = {
  fullName?: string;
  email?: string;
  profileImage?: string;
};

const AdminSidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  // Admins live in the Donor collection, so we reuse the admin-only
  // "get donor by id" endpoint with the admin's own id (from the userId
  // cookie set at login) to populate the sidebar card.
  const fetchAdmin = useCallback(async () => {
    const userId = getCookie("userId");
    if (!userId) return;

    try {
      const res = await getDonorByIdApi(userId);
      setAdmin(res.data);
    } catch (err) {
      console.log("Failed to load admin in sidebar", err);
    }
  }, []);

  useEffect(() => {
    fetchAdmin();
  }, [fetchAdmin]);

  const navLinks = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Donors", path: "/admin/donors", icon: Users },
    { name: "NGOs", path: "/admin/ngos", icon: HeartHandshake },
    { name: "Rewards", path: "/admin/rewards", icon: Gift },
  ];

  const isActive = (path: string) =>
    path === "/admin" ? pathname === path : pathname.startsWith(path);

  const handleLogout = () => {
    logout();
  };

  const image = admin?.profileImage
    ? `/uploads/profile/${admin.profileImage}?t=${Date.now()}`
    : null;

  return (
    <>
      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-slate-900/40 md:hidden transition-opacity z-40 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* FIXED POSITIONING FLOATING SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 h-screen w-76 bg-white flex flex-col z-50
        transition-all duration-300

        /* Desktop Floating Position Configuration */
        md:left-4 md:top-4 md:h-[calc(100vh-2rem)] md:rounded-[2.5rem]
        md:border md:border-gray-100/80 md:shadow-[0_8px_32px_0_rgba(0,0,0,0.03)]

        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* HEADER */}
        <div className="pt-8 px-7 pb-5">
          <div className="flex justify-between items-center mb-6">
            <Link href="/admin" className="flex items-center">
              <Image
                src="/logo.png"
                alt="SewaSetu Logo"
                width={120}
                height={40}
                priority
              />
            </Link>

            <button onClick={() => setOpen(false)} className="md:hidden">
              <X size={18} />
            </button>
          </div>

          {/* CURVED USER CARD */}
          <div className="flex items-center gap-3 bg-slate-50/80 p-3 rounded-2xl border border-slate-100/50">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-emerald-500/10 flex items-center justify-center bg-emerald-950">
              {image ? (
                <Image
                  src={image}
                  alt="profile"
                  fill
                  sizes="48px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm text-slate-800 truncate">
                {admin?.fullName || "Admin"}
              </p>
              <p className="text-xs text-gray-400 truncate mt-0.5">
                {admin?.email || ""}
              </p>
            </div>
          </div>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navLinks.map(({ name, path, icon: Icon }) => {
            const active = isActive(path);

            return (
              <Link
                key={path}
                href={path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition text-sm font-medium
                outline-none focus:outline-none focus-visible:outline-none
                ${
                  active
                    ? "bg-emerald-500/10 text-emerald-800 font-semibold"
                    : "text-gray-500 hover:bg-gray-50/80 hover:text-slate-700"
                }`}
              >
                <Icon
                  size={18}
                  className={active ? "text-emerald-600" : "text-gray-400"}
                />
                {name}
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="p-5 border-t border-slate-100/60">
          <button
            onClick={handleLogout}
            className="w-full flex items-left justify-left gap-2 text-red-500 hover:bg-red-50/60 p-3.5 rounded-2xl text-sm font-medium transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* MOBILE BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 md:hidden p-2 bg-white border border-slate-100 shadow-sm rounded-xl z-30 transition active:scale-95"
      >
        <Menu size={20} className="text-slate-700" />
      </button>
    </>
  );
};

export default AdminSidebar;
