import NgoNavbar from "@/app/components/layout/NgoNavbar";
import "../../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NgoNavbar />
      {children}
    </>
  );
}
