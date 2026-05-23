"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();

  const [showNavbar, setShowNavbar] = useState(true);

  const lastScrollY = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // always show at top
      if (currentScrollY < 50) {
        setShowNavbar(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        lastScrollY.current = currentScrollY;
        return;
      }

      // scrolling up → show immediately
      if (currentScrollY < lastScrollY.current) {
        setShowNavbar(true);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }

      // scrolling down → hide after delay
      if (currentScrollY > lastScrollY.current) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          setShowNavbar(false);
        }, 500); // ⬅️ smooth delay
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Impact", path: "/impact" },
    { name: "About", path: "/about" },
  ];

  return (
<header
  className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] z-50
  bg-white backdrop-blur-md
  border border-gray-200 shadow-lg
  rounded-4xl px-8 py-4
  transition-all duration-500 ease-in-out
  ${
    showNavbar
      ? "opacity-100 translate-y-0"
      : "opacity-0 -translate-y-6 pointer-events-none"
  }`}
>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logoo.png"
          alt="SewaSetu Logo"
          width={300}
          height={400}
        />
      </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link
            href="/"
            className={`pb-1 transition-colors duration-200 hover:text-blue-500 ${
              pathname === "/"
                ? "text-blue-500 font-bold border-b-2 border-blue-text-blue-500"
                : "text-black"
            }`}
          >
            Home
          </Link>

          <Link
            href="/how-it-works"
            className={`pb-1 transition-colors duration-200 hover:text-blue-500 ${
              pathname === "/how-it-works"
                ? "text-blue-500 font-bold border-b-2 border-blue-text-blue-500"
                : "text-black"
            }`}
          >
            How It Works
          </Link>

          <Link
            href="/impact"
            className={`pb-1 transition-colors duration-200 hover:text-blue-500 ${
              pathname === "/impact"
                ? "text-blue-500 font-bold border-b-2 border-blue-text-blue-500"
                : "text-black"
            }`}
          >
            Impact
          </Link>

          <Link
            href="/about"
            className={`pb-1 transition-colors duration-200 hover:text-blue-500 ${
              pathname === "/about"
                ? "text-blue-500 font-bold border-b-2 border-blue-text-blue-500"
                : "text-black"
            }`}
          >
            About
          </Link>
        </nav>

      <div className="flex items-center">
        <Link
          href="/login"
          className={`px-5 py-2 rounded-full font-semibold transition-all duration-200
          border border-white/20 backdrop-blur-md
          
          ${
            pathname === "/login"
              ? "bg-orange-500 text-white shadow-lg"
              : "bg-white/10 text-black hover:text-blue-500"
          }`}
        >
          Sign In
        </Link>

        <Link
          href="/register"
          className={`px-5 py-2 rounded-full font-semibold transition-all duration-200
          border border-white/20 backdrop-blur-md
          
          ${
            pathname === "/register"
              ? "bg-orange-500 text-white shadow-lg"
              : "bg-white/10 text-black hover:text-blue-500"
          }`}
        >
          Signup
        </Link>
      </div>

      </div>
    </header>
  );
};

export default Navbar;