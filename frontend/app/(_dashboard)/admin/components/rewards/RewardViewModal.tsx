"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Reward } from "@/app/lib/api/rewards.api";
import { getImageUrl } from "@/app/lib/utils/getImageUrl";

interface RewardViewModalProps {
  reward: Reward | null;
  onClose: () => void;
}

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

export default function RewardViewModal({ reward, onClose }: RewardViewModalProps) {
  if (!reward) return null;

  const imageUrl = getImageUrl("rewards", reward.image);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Reward Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image */}
          {imageUrl && (
            <div className="relative h-64 w-full overflow-hidden rounded-xl bg-slate-100">
              <Image
                src={imageUrl}
                alt={reward.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{reward.title}</h3>
              <p className="text-slate-600 mt-1">{reward.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Partner
                </p>
                <p className="font-semibold text-slate-800">{reward.partnerName}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Promo Code
                </p>
                <p className="font-mono font-semibold text-slate-800">{reward.promoCode}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Required Points
                </p>
                <p className="font-semibold text-slate-800">{reward.requiredPoints}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Discount
                </p>
                <p className="font-semibold text-slate-800">{formatDiscount(reward)}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Expiry Date
                </p>
                <p className="font-semibold text-slate-800">{formatDate(reward.expiryDate)}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Created Date
                </p>
                <p className="font-semibold text-slate-800">{formatDate(reward.createdAt)}</p>
              </div>
            </div>

            {/* Active Status */}
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                Active
              </p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  reward.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {reward.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            {/* Terms */}
            {reward.terms && (
              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Terms & Conditions
                </p>
                <p className="text-sm text-slate-700">{reward.terms}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
