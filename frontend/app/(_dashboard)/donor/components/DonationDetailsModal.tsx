"use client";

import { useState } from "react";
import {
  X,
  MapPin,
  Calendar,
  Package,
  User,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Donation } from "@/app/lib/api/donation.api";
import StatusBadge from "@/app/components/ui/StatusBadge";

interface DonationDetailsModalProps {
  open: boolean;
  donation: Donation | null;
  onClose: () => void;
}

export default function DonationDetailsModal({
  open,
  donation,
  onClose,
}: DonationDetailsModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!open || !donation) return null;

  const photos = donation.photos || [];
  const hasPhotos = photos.length > 0;
  const currentPhoto = hasPhotos ? photos[currentImageIndex] : null;

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
                      src={`/uploads/donations/${currentPhoto}`}
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
                            src={`/uploads/donations/${photo}`}
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
                        <StatusBadge status={donation.adminStatus} />
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

              {/* NGO Claim Information */}
              {donation.claimedByNgoId && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    NGO Claim Information
                  </h4>
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl space-y-3">
                    <div className="flex items-center gap-4">
                      {donation.claimedByNgoId.profileImage ? (
                        <img
                          src={`/uploads/profile/${donation.claimedByNgoId.profileImage}`}
                          alt={donation.claimedByNgoId.organizationName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {donation.claimedByNgoId.organizationName}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                          <Mail size={14} />
                          <span>{donation.claimedByNgoId.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-blue-200">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Status</p>
                        <StatusBadge status={donation.status} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Claim Date</p>
                        <p className="text-sm font-medium text-gray-900">
                          {donation.claimedAt
                            ? new Date(donation.claimedAt).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                    {donation.claimedByNgoId.contactPerson && (
                      <div className="pt-2 border-t border-blue-200">
                        <p className="text-xs text-gray-500 mb-1">
                          Contact Person
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {donation.claimedByNgoId.contactPerson}
                        </p>
                      </div>
                    )}
                    {donation.claimedByNgoId.address && (
                      <div className="pt-2 border-t border-blue-200">
                        <p className="text-xs text-gray-500 mb-1">Location</p>
                        <div className="flex items-start gap-1 text-sm text-gray-900">
                          <MapPin size={14} className="mt-0.5 shrink-0" />
                          <span className="line-clamp-2">
                            {donation.claimedByNgoId.address}
                          </span>
                        </div>
                      </div>
                    )}
                    {donation.rewardPointsAwarded &&
                      donation.rewardPointsAwarded > 0 && (
                        <div className="pt-2 border-t border-blue-200">
                          <div className="flex items-center gap-2 text-sm text-emerald-700 font-medium bg-emerald-50 rounded-lg p-2">
                            <span className="text-lg">🎉</span>
                            <span>
                              You earned {donation.rewardPointsAwarded} reward
                              points
                            </span>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
