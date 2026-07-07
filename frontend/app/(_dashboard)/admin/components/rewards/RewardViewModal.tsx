"use client";

import Image from "next/image";
import { X, Calendar, Ticket, Award, Store, Info, Clock } from "lucide-react";
import { Reward } from "@/app/lib/api/rewards.api";
import { getImageUrl } from "@/app/lib/utils/getImageUrl";

interface RewardViewModalProps {
  reward: Reward | null;
  onClose: () => void;
}

// --- Helper Functions ---

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
      return `${reward.discountValue}% OFF`;
    case "fixed":
      return `Rs. ${reward.discountValue}`;
    case "freebie":
      return "Free Gift";
    default:
      return "-";
  }
};

// --- Sub-component ---

function InfoBox({
  icon,
  label,
  value,
  isMono = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  isMono?: boolean;
}) {
  return (
    <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
      <div className="flex items-center text-emerald-600 mb-1.5 gap-1.5">
        {icon}
        <p className="text-[10px] font-bold uppercase tracking-wider">
          {label}
        </p>
      </div>
      <p
        className={`font-semibold text-slate-900 ${isMono ? "font-mono text-sm" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}

// --- Main Component ---

export default function RewardViewModal({
  reward,
  onClose,
}: RewardViewModalProps) {
  if (!reward) return null;

  const imageUrl = getImageUrl("rewards", reward.image);

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header / Hero Image Section */}
        <div className="relative h-48 w-full bg-slate-100 shrink-0">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={reward.title}
              fill
              className="object-cover"
              unoptimized
            />
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-red/90 hover:bg-red-50 shadow-lg rounded-full transition-all text-white-700 hover:text-red-600"
          >
            <X size={20} />
          </button>

          <div className="absolute bottom-4 left-6">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                reward.isActive
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-400 text-white"
              }`}
            >
              {reward.isActive ? "Active Reward" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {reward.title}
            </h2>
            <p className="text-slate-500 mt-2 leading-relaxed text-sm">
              {reward.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <InfoBox
              icon={<Store size={14} />}
              label="Partner"
              value={reward.partnerName}
            />
            <InfoBox
              icon={<Ticket size={14} />}
              label="Promo Code"
              value={reward.promoCode}
              isMono
            />
            <InfoBox
              icon={<Award size={14} />}
              label="Cost"
              value={`${reward.requiredPoints} Pts`}
            />
            <InfoBox
              icon={<Info size={14} />}
              label="Discount"
              value={formatDiscount(reward)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center text-sm text-slate-500">
                <Calendar size={16} className="mr-2 text-emerald-500" />
                <span>
                  Valid until:{" "}
                  <span className="font-semibold text-slate-900">
                    {formatDate(reward.expiryDate)}
                  </span>
                </span>
              </div>
              <div className="flex items-center text-sm text-slate-500">
                <Clock size={16} className="mr-2 text-emerald-500" />
                <span>Created: {formatDate(reward.createdAt)}</span>
              </div>
            </div>

            {reward.terms && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mt-4">
                <p className="text-xs font-bold text-emerald-600 uppercase mb-2 tracking-wider">
                  Terms & Conditions
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {reward.terms}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
