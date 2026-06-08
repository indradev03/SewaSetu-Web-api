import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "green" | "orange" | "secondary";
};

export default function Button({
  variant = "green",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "w-full py-3 rounded-xl font-semibold shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]";

  const variants = {
    green:
      "bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:shadow-lg hover:scale-[1.02]",

    orange:
      "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-lg hover:scale-[1.02]",

    secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200",
  };

  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${className}`}
    />
  );
}