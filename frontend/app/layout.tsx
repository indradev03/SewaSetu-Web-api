import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/layout/Navbar";

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
      <body className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 bg-fixed">
        
        <Navbar />

        <main className="flex-1">
          {children}
        </main>

      </body>
    </html>
  );
}