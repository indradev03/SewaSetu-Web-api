import DonorSidebar from "@/app/components/layout/DonorSidebar";

export default function DonorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DonorSidebar />
      <main className="pt-20">{children}</main>
    </>
  );
}
