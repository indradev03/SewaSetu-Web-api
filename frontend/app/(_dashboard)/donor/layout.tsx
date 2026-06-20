import "../../globals.css";
import DonorSidebar from "@/app/components/layout/DonorSidebar";

export default function DonorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <DonorSidebar />

      {/* MAIN CONTENT AREA */}
      <main className="md:ml-75 min-h-screen  px-4 md:px-2">{children}</main>
    </div>
  );
}
