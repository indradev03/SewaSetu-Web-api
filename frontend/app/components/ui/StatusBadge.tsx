"use client";

import { Clock, Check, X, Package, Truck } from "lucide-react";

interface StatusBadgeProps {
  status: "Pending" | "Approved" | "Rejected" | "Collected" | "Available" | "Claimed" | "PickedUp" | "Completed";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    Pending: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-700",
      icon: Clock,
    },
    Approved: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      icon: Check,
    },
    Rejected: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      icon: X,
    },
    Collected: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      icon: Package,
    },
    Available: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      icon: Check,
    },
    Claimed: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      icon: Clock,
    },
    PickedUp: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-700",
      icon: Truck,
    },
    Completed: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700",
      icon: Check,
    },
  };

  const { bg, border, text, icon: Icon } = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs ${bg} ${border} ${text} px-3 py-1.5 rounded-full font-medium border`}
    >
      <Icon size={12} />
      {status}
    </span>
  );
}
