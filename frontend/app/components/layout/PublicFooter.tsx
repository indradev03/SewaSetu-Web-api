"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer"; // Adjust path if needed

export default function PublicFooter() {
  const pathname = usePathname();

  // Hide the footer on dashboard panels
  const hideFooter =
    pathname.startsWith("/donor") || pathname.startsWith("/ngo");

  if (hideFooter) return null;

  return <Footer />;
}
