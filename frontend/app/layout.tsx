import "./globals.css";
import type { Metadata } from "next";
import PublicNavbar from "./components/layout/PublicNavbar";

export const metadata: Metadata = {
  title: "SewaSetu",
  description: "Donation Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-linear-to-br from-green-50 via-white to-emerald-50 bg-fixed">
        <PublicNavbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
