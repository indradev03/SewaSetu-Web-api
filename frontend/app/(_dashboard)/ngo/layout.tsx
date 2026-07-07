import NgoSidebar from "@/app/components/layout/NgoSidebar";
import "../../globals.css";

export default function NgoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <div className="fixed inset-y-0 left-0 z-20">
        <NgoSidebar />
      </div>

      <main className="flex-1 md:ml-80 min-h-screen px-4 md:px-6">
        {children}
      </main>
    </div>
  );
}
