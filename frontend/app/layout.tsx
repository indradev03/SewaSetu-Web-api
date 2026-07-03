import "./globals.css";
import type { Metadata } from "next";
import PublicNavbar from "./components/layout/PublicNavbar";
import { ToastContainer } from "react-toastify";
import PublicFooter from "./components/layout/PublicFooter";
import { AuthProvider } from "./lib/context/AuthContext";

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
      <body className="min-h-screen bg-fixed">
        <AuthProvider>
          <PublicNavbar />
          <main>{children}</main>
          <ToastContainer position="top-right" autoClose={3000} />
          {/* Bottom Floating Footer */}
          <PublicFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
