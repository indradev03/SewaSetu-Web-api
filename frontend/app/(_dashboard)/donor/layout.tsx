import "../../globals.css";
import DonorSidebar from "@/app/components/layout/DonorSidebar";

export default function DonorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Fix its positioning to ensure layout stability */}
      <div className="fixed inset-y-0 left-0 z-20">
        <DonorSidebar />
      </div>

      {/* MAIN CONTENT AREA */}
      {/* Changed md:ml-75 to md:ml-[18.75rem] to handle the explicit layout clearance */}
      <main className="flex-1 md:ml-75 min-h-screen px-4 md:px-6">
        {children}
      </main>
    </div>
  );
}
