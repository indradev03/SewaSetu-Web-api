"use client";

import { useState, useEffect } from "react";
import {
  Package,
  MapPin,
  Calendar,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  ArrowRight,
} from "lucide-react";
import {
  getAvailableDonationsApi,
  claimDonationApi,
  type Donation,
} from "@/app/lib/api/donation.api";
import Button from "@/app/components/ui/button";

export default function NGODonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(
    null,
  );

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const res = await getAvailableDonationsApi();
      setDonations(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch donations");
    } finally {
      setLoading(false);
    }
  };

  const handleClaimClick = (donation: Donation) => {
    setSelectedDonation(donation);
    setShowConfirmDialog(true);
  };

  const handleConfirmClaim = async () => {
    if (!selectedDonation) return;

    try {
      setClaimingId(selectedDonation._id);
      console.log("Claiming donation:", selectedDonation._id);
      const response = await claimDonationApi(selectedDonation._id);
      console.log("Claim response:", response);
      setShowConfirmDialog(false);
      setSelectedDonation(null);
      await fetchDonations();
    } catch (err: any) {
      console.error("Claim error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to claim donation",
      );
    } finally {
      setClaimingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "text-emerald-700 bg-emerald-50/80 border-emerald-200/60";
      case "Claimed":
        return "text-blue-700 bg-blue-50/80 border-blue-200/60";
      case "PickedUp":
        return "text-amber-700 bg-amber-50/80 border-amber-200/60";
      case "Completed":
        return "text-purple-700 bg-purple-50/80 border-purple-200/60";
      default:
        return "text-gray-700 bg-gray-50/80 border-gray-200/60";
    }
  };

  const getCategoryIcon = (category: string) => {
    return <Package className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <div className="w-full py-12 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-500">
            Loading available donations...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-12 flex items-center justify-center">
        <div className="text-center space-y-4 bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <p className="text-sm text-red-700">{error}</p>
          <Button onClick={fetchDonations} className="w-full">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 py-8 px-2 md:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Available Donations
          </h1>
          <p className="text-sm text-slate-500">
            Browse and claim donations from verified donors
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search donations..."
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition">
            <Filter className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <Package className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {donations.length}
              </p>
              <p className="text-xs text-slate-500">Total Available</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">0</p>
              <p className="text-xs text-slate-500">Your Claims</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">Today</p>
              <p className="text-xs text-slate-500">Last Updated</p>
            </div>
          </div>
        </div>
      </div>

      {/* Donations Grid */}
      {donations.length === 0 ? (
        <div className="bg-white rounded-4xl border border-slate-100 p-12 text-center shadow-sm">
          <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            No Available Donations
          </h3>
          <p className="text-sm text-slate-500">
            Check back later for new donation opportunities.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
            >
              {/* Image */}
              {donation.photos && donation.photos.length > 0 ? (
                <div className="relative h-48 bg-slate-100">
                  <img
                    src={donation.photos[0]}
                    alt={donation.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Button
                      onClick={() => handleClaimClick(donation)}
                      disabled={claimingId === donation._id}
                      className="bg-white/90 backdrop-blur-sm hover:bg-blue-500 hover:text-white text-blue-600 border-2  shadow-lg px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                    >
                      {claimingId === donation._id ? "Claiming..." : "Claim"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="relative h-48 bg-slate-100 flex items-center justify-center">
                  <Package className="w-16 h-16 text-slate-300" />
                  <div className="absolute top-3 right-3">
                    <Button
                      onClick={() => handleClaimClick(donation)}
                      disabled={claimingId === donation._id}
                      className="bg-white/90 backdrop-blur-sm hover:bg-blue-500 hover:text-white text-blue-600 border-2 shadow-lg px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                    >
                      {claimingId === donation._id ? "Claiming..." : "Claim"}
                    </Button>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-5 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(donation.category)}
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-md border border-slate-200/40">
                      {donation.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 line-clamp-2">
                    {donation.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {donation.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Package className="w-3.5 h-3.5" />
                    <span>
                      {donation.quantity} {donation.unit}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="line-clamp-1">
                      {donation.pickupAddress}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <User className="w-3.5 h-3.5" />
                    <span>{donation.donorId.fullName}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && selectedDonation && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-blue-600">
              <CheckCircle2 className="w-8 h-8" />
              <h3 className="text-lg font-bold">Claim Donation</h3>
            </div>
            <p className="text-sm text-slate-600">
              Do you want to claim <strong>{selectedDonation.title}</strong>?
            </p>
            <p className="text-xs text-slate-500">
              By claiming this donation, you agree to coordinate pickup with the
              donor and mark it as completed when delivered.
            </p>
            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => {
                  setShowConfirmDialog(false);
                  setSelectedDonation(null);
                }}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmClaim}
                disabled={claimingId === selectedDonation._id}
                className="flex-1 bg-blue-500 hover:bg-blue-400 text-white"
              >
                {claimingId === selectedDonation._id
                  ? "Claiming..."
                  : "Confirm"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
