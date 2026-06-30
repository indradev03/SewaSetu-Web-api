import AdminSidebar from "@/app/components/layout/AdminSidebar";
import "../../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Fix its positioning to ensure layout stability */}
      <div className="fixed inset-y-0 left-0 z-20">
        <AdminSidebar />
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-75 min-h-screen px-4 md:px-6">
        {children}
      </main>
    </div>
  );
}
