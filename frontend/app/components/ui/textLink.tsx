import Link, { LinkProps } from "next/link";
import React from "react";

type TextLinkProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "hover-green" | "solid-green";
  active?: boolean;
};

export default function TextLink({
  href,
  children,
  className = "",
  variant = "default",
  active = false,
  ...props
}: TextLinkProps) {
  const base = "font-medium transition";

  const styles = {
    default: "text-black hover:text-emerald-600",
    "hover-green": "text-black hover:text-green-600",
    "solid-green": "text-green-600",
  };

  const activeStyle = active ? "font-bold text-green-600" : "";

  return (
    <Link
      href={href}
      {...props}
      className={`${base} ${styles[variant]} ${activeStyle} ${className}`}
    >
      {children}
    </Link>
  );
}