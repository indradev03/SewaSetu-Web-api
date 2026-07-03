"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function PublicNavbar() {
  const pathname = usePathname();

  const hideNavbar =
    pathname.startsWith("/donor") ||
    pathname.startsWith("/ngo") ||
    pathname.startsWith("/admin");

  if (hideNavbar) return null;

  return <Navbar />;
}
