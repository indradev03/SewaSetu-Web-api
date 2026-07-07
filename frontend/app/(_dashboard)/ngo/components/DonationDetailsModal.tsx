"use client";

import { useState } from "react";
import {
  X,
  MapPin,
  Calendar,
  Package,
  User,
  Mail,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Phone,
} from "lucide-react";
import { Donation } from "@/app/lib/api/donation.api";
import StatusBadge from "@/app/components/ui/StatusBadge";
import Button from "@/app/components/ui/button";

interface DonationDetailsModalProps {
  open: boolean;
  donation: Donation | null;
  onClose: () => void;
  onClaim: (donation: Donation) => void;
  claimingId: string | null;
}

export default function DonationDetailsModal({
  open,
  donation,
  onClose,
  onClaim,
  claimingId,
}: DonationDetailsModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!open || !donation) return null;

  const photos = donation.photos || [];
  const hasPhotos = photos.length > 0;

  const nextImage = () => {
    if (hasPhotos) {
      setCurrentImageIndex((prev) => (prev + 1) % photos.length);
    }
  };

  const prevImage = () => {
    if (hasPhotos) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + photos.length) % photos.length,
      );
    }
  };

  const handleClaim = () => {
    onClose();
    onClaim(donation);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 overflow-y-auto py-8">
      <div className="w-full max-w-4xl rounded-4xl bg-white shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-3xl font-semibold tracking-tight text-emerald-600 font-serif">
            Donation Details
          </h2>
          <button
            onClick={onClose}
            className="group flex h-9 w-9 items-center justify-center rounded-full bg-red-100 transition-colors hover:bg-red-600"
          >
            <X className="h-5 w-5 text-red-600 transition-colors group-hover:text-white" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <div>
              {hasPhotos ? (
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                    <img
                      src={photos[currentImageIndex]}
                      alt={`Donation photo ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {photos.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition"
                      >
                        <ChevronLeft className="w-5 h-5 text-slate-700" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition"
                      >
                        <ChevronRight className="w-5 h-5 text-slate-700" />
                      </button>
                    </>
                  )}

                  {/* Thumbnails */}
                  {photos.length > 1 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                      {photos.map((photo, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                            index === currentImageIndex
                              ? "border-emerald-500"
                              : "border-transparent hover:border-gray-300"
                          }`}
                        >
                          <img
                            src={photo}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-square rounded-2xl bg-gray-100 flex items-center justify-center">
                  <Package className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              {/* Donation Information */}
              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Donation Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {donation.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-2">
                        <StatusBadge status={donation.status} />
                        <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                          {donation.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {donation.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Package size={16} className="text-gray-400" />
                      <span>
                        {donation.quantity} {donation.unit}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} className="text-gray-400" />
                      <span>
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin size={16} className="text-gray-400 mt-0.5" />
                    <span className="line-clamp-2">
                      {donation.pickupAddress}
                    </span>
                  </div>

                  {donation.adminRejectionReason && (
                    <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                      <p className="text-xs font-semibold text-red-700 mb-1">
                        Rejection Reason
                      </p>
                      <p className="text-sm text-red-600">
                        {donation.adminRejectionReason}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Donor Information */}
              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Donor Information
                </h4>
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl space-y-3">
                  <div className="flex items-center gap-4">
                    {donation.donorId.profileImage ? (
                      <img
                        src={`/uploads/profile/${donation.donorId.profileImage}`}
                        alt={donation.donorId.fullName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                        <User className="w-6 h-6 text-emerald-600" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {donation.donorId.fullName}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                        <Mail size={16} className="text-emerald-600" />
                        <span>{donation.donorId.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3 pt-2 border-t border-emerald-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={16} className="text-emerald-600" />
                      <span>{donation.donorId.phoneNumber}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin
                        size={16}
                        className="text-emerald-600 mt-0.5 shrink-0"
                      />
                      <span className="line-clamp-2">
                        {donation.pickupAddress}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                {/* Handled by Admin Badge */}
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mt-3">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <p className="text-xs text-blue-700 font-medium">
                    Handled by Admin
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-gray-200">
                <Button
                  onClick={handleClaim}
                  disabled={
                    claimingId === donation._id ||
                    donation.status !== "Available"
                  }
                  className="w-full bg-linear-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white py-3 rounded-2xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {claimingId === donation._id
                    ? "Claiming..."
                    : "Claim This Donation"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
