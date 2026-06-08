import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "green" | "orange" | "secondary";
  className?: string;
};

const base =
  "w-full py-3 rounded-xl font-semibold shadow-md transition active:scale-[0.98] text-center";

const variants = {
  green:
    "bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:shadow-lg hover:scale-[1.02]",

  orange:
    "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-lg hover:scale-[1.02]",

  secondary:
    "bg-gray-100 text-gray-800 hover:bg-gray-200",
};

export default function ButtonLink({
  href,
  children,
  variant = "green",
  className = "",
}: ButtonLinkProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}