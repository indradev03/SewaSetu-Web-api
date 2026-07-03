"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { Reward } from "@/app/lib/api/rewards.api";
import { getImageUrl } from "@/app/lib/utils/getImageUrl";

// ── Props ─────────────────────────────────────────────

interface RewardTableProps {
  rewards?: Reward[];
  loading: boolean;
  onEdit: (id: string) => void;
  onDelete: (reward: Reward) => void;
  onToggle: (id: string) => void;
}

// ── Helpers ───────────────────────────────────────────

const formatDate = (date?: string) => {
  if (!date) return "-";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(d);
};

const formatDiscount = (reward: Reward) => {
  switch (reward.discountType) {
    case "percentage":
      return `${reward.discountValue}%`;
    case "fixed":
      return `Rs. ${reward.discountValue}`;
    case "freebie":
      return "Freebie";
    default:
      return "-";
  }
};

export default function RewardTable({
  rewards,
  loading,
  onEdit,
  onDelete,
  onToggle,
}: RewardTableProps) {
  return (
    <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* HEADER */}
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-400">
                Reward
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-400">
                Partner
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-400">
                Promo Code
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-400">
                Discount
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-400">
                Expiry
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-400">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-400">
                Actions
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-400">
                  Loading rewards...
                </td>
              </tr>
            ) : !rewards?.length ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400">
                  <p className="font-medium text-slate-500">No rewards found</p>
                  <p className="text-xs mt-1 text-slate-300">
                    Create your first reward to get started.
                  </p>
                </td>
              </tr>
            ) : (
              rewards.map((reward) => {
                const imageUrl = getImageUrl("rewards", reward.image);

                return (
                  <tr key={reward._id} className="hover:bg-slate-50 transition">
                    {/* REWARD */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-slate-100 flex items-center justify-center">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={reward.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <span className="text-xs text-slate-400">
                              No Img
                            </span>
                          )}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {reward.title}
                          </p>
                          <p className="text-xs text-slate-400 line-clamp-1">
                            {reward.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">{reward.partnerName}</td>
                    <td className="px-6 py-4 font-mono text-xs">
                      {reward.promoCode}
                    </td>
                    <td className="px-6 py-4">{formatDiscount(reward)}</td>
                    <td className="px-6 py-4">
                      {formatDate(reward.expiryDate)}
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onToggle(reward._id)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                          reward.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {reward.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onEdit(reward._id)}
                          className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold hover:bg-slate-200"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>

                        <button
                          onClick={() => onDelete(reward)}
                          className="inline-flex items-center gap-1 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
