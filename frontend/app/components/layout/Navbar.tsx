"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

  const [showNavbar, setShowNavbar] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const lastScrollY = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setShowNavbar(true);
        return;
      }

      if (currentScrollY < lastScrollY.current) {
        setShowNavbar(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }

      if (currentScrollY > lastScrollY.current) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
          setShowNavbar(false);
        }, 500);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Impact", path: "/impact" },
    { name: "About", path: "/about" },
  ];

  return (
    <header
      className={`fixed top-3 left-1/2 -translate-x-1/2 z-50
      w-[92%] md:w-[70%]
      bg-white/90 backdrop-blur-md
      border border-gray-200 shadow-lg
      rounded-3xl px-4 md:px-8 py-3
      transition-all duration-500 ease-in-out
      ${
        showNavbar
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-6 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="SewaSetu Logo"
            width={120}
            height={40}
            className="h-auto w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`transition-colors duration-200 hover:text-blue-500 ${
                pathname === link.path
                  ? "text-blue-500 font-bold border-b-2 border-blue-500"
                  : "text-black"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Buttons (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className={`px-4 py-2 rounded-full font-medium transition
            ${
              pathname === "/login"
                ? "bg-orange-500 text-white"
                : "text-black hover:text-blue-500"
            }`}
          >
            SignIn
          </Link>

          <Link
            href="/register/role_selection"
            className={`px-4 py-2 rounded-full font-medium transition
            ${
              pathname.startsWith("/register")
                ? "bg-orange-500 text-white"
                : "text-black hover:text-blue-500"
            }`}
          >
            SignUp
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="text-black" />
          ) : (
            <Menu className="text-black" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 border-t pt-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMobileOpen(false)}
              className={`text-sm ${
                pathname === link.path
                  ? "text-blue-500 font-bold"
                  : "text-black"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex gap-3 pt-2">
            <Link
              href="/login"
              className={`px-4 py-2 text-sm ${
                pathname === "/login"
                  ? "bg-orange-500 text-white rounded-full"
                  : "text-black"
              }`}
            >
              Signin
            </Link>

            <Link
              href="/register/role_selection"
              className={`px-4 py-2 rounded-full text-sm
              ${
                pathname.startsWith("/register")
                  ? "bg-orange-500 text-white"
                  : "bg-orange-500 text-white"
              }`}
            >
              Signup
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;