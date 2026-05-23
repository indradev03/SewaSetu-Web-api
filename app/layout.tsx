
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/layout/Navbar";


export const metadata: Metadata = {
  title: "SewaSetu",
  description: "Donation Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#F5F5EE]">
        <Navbar />

        <main>{children}</main>

      </body>
    </html>
  );
}