"use client";

import { useState, useEffect } from "react";
import {
  Package,
  MapPin,
  Calendar,
  User,
  Truck,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  ArrowRight,
} from "lucide-react";
import {
  getNgoClaimedDonationsApi,
  pickupDonationApi,
  completeDonationApi,
  releaseClaimApi,
  deleteClaimedDonationApi,
  type Donation,
} from "@/app/lib/api/donation.api";
import Button from "@/app/components/ui/button";
import DeleteConfirmationModal from "@/app/(_dashboard)/admin/components/donation/DeleteConfirmationModal";

export default function NGOMyClaimsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [donationToDelete, setDonationToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const res = await getNgoClaimedDonationsApi();
      setDonations(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch claimed donations");
    } finally {
      setLoading(false);
    }
  };

  const handlePickup = async (id: string) => {
    try {
      setActionLoading(id);
      await pickupDonationApi(id);
      await fetchDonations();
    } catch (err: any) {
      setError(err.message || "Failed to mark as picked up");
    } finally {
      setActionLoading(null);
    }
  };

  const handleComplete = async (id: string) => {
    try {
      setActionLoading(id);
      await completeDonationApi(id);
      await fetchDonations();
    } catch (err: any) {
      setError(err.message || "Failed to mark as completed");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRelease = async (id: string) => {
    try {
      setActionLoading(id);
      await releaseClaimApi(id);
      await fetchDonations();
    } catch (err: any) {
      setError(err.message || "Failed to release claim");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!donationToDelete) return;

    setDeleting(true);

    try {
      await deleteClaimedDonationApi(donationToDelete);
      await fetchDonations();

      setDeleteModalOpen(false);
      setDonationToDelete(null);
    } catch (err: any) {
      setError(err.message || "Failed to delete donation");
    } finally {
      setDeleting(false);
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Claimed":
        return <CheckCircle2 className="w-5 h-5" />;
      case "PickedUp":
        return <Truck className="w-5 h-5" />;
      case "Completed":
        return <CheckCircle2 className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const filteredDonations =
    statusFilter === "all"
      ? donations
      : donations.filter((d) => d.status === statusFilter);

  const statusCounts = {
    all: donations.length,
    Claimed: donations.filter((d) => d.status === "Claimed").length,
    PickedUp: donations.filter((d) => d.status === "PickedUp").length,
    Completed: donations.filter((d) => d.status === "Completed").length,
  };

  if (loading) {
    return (
      <div className="w-full py-12 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-500">
            Loading your claimed donations...
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
            My Claimed Donations
          </h1>
          <p className="text-sm text-slate-500">
            Track and manage your claimed donations
          </p>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {["all", "Claimed", "PickedUp", "Completed"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${
              statusFilter === status
                ? "bg-blue-500 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {status === "all" ? "All" : status} (
            {statusCounts[status as keyof typeof statusCounts]})
          </button>
        ))}
      </div>

      {/* Donations List */}
      {filteredDonations.length === 0 ? (
        <div className="bg-white rounded-4xl border border-slate-100 p-12 text-center shadow-sm">
          <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            No Claimed Donations
          </h3>
          <p className="text-sm text-slate-500">
            {statusFilter === "all"
              ? "You haven't claimed any donations yet."
              : `No donations with status "${statusFilter}"`}
          </p>
          {statusFilter === "all" && (
            <Button
              onClick={() => (window.location.href = "/ngo/donations")}
              className="mt-4"
            >
              Browse Available Donations
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image */}
              {donation.photos && donation.photos.length > 0 ? (
                <div className="w-full h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={donation.photos[0]}
                    alt={donation.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-slate-100 flex items-center justify-center">
                  <Package className="w-16 h-16 text-slate-300" />
                </div>
              )}

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-md border border-slate-200/40">
                      {donation.category}
                    </span>
                    <span
                      className={`text-[10px] px-3 py-1 font-extrabold rounded-full border tracking-wider uppercase ${getStatusColor(
                        donation.status,
                      )}`}
                    >
                      {donation.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
                    {donation.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2">
                    {donation.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Quantity
                    </p>
                    <p className="text-sm font-medium text-slate-700">
                      {donation.quantity} {donation.unit}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Donor
                    </p>
                    <p className="text-sm font-medium text-slate-700 line-clamp-1">
                      {donation.donorId.fullName}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Pickup Address
                    </p>
                    <p className="text-sm font-medium text-slate-700 line-clamp-1">
                      {donation.pickupAddress}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Claim Date
                    </p>
                    <p className="text-sm font-medium text-slate-700">
                      {donation.claimedAt
                        ? new Date(donation.claimedAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-slate-100 mt-auto">
                  {/* CLAIMED: Two buttons */}
                  {donation.status === "Claimed" && (
                    <>
                      <Button
                        onClick={() => handlePickup(donation._id)}
                        disabled={actionLoading === donation._id}
                        className="flex-1 text-sm flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400"
                      >
                        {actionLoading === donation._id ? (
                          "Updating..."
                        ) : (
                          <>
                            {" "}
                            <Truck className="w-4 h-4" /> Pickup{" "}
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={() => handleRelease(donation._id)}
                        disabled={actionLoading === donation._id}
                        variant="red"
                        className="flex-1 text-sm flex items-center justify-center gap-2"
                      >
                        {actionLoading === donation._id
                          ? "Updating..."
                          : "Release"}
                      </Button>
                    </>
                  )}

                  {/* PICKED UP: Indicator + Button */}
                  {donation.status === "PickedUp" && (
                    <>
                      <div className="flex-1 flex items-center justify-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200/60 rounded-xl font-medium">
                        <Truck className="w-4 h-4" />
                        <span>Picked Up</span>
                      </div>
                      <Button
                        onClick={() => handleComplete(donation._id)}
                        disabled={actionLoading === donation._id}
                        className="flex-1 text-sm flex items-center justify-center gap-2"
                      >
                        {actionLoading === donation._id ? (
                          "Updating..."
                        ) : (
                          <>
                            {" "}
                            <CheckCircle2 className="w-4 h-4" /> Complete{" "}
                          </>
                        )}
                      </Button>
                    </>
                  )}

                  {/* COMPLETED: Indicator + Delete Button */}
                  {donation.status === "Completed" && (
                    <>
                      <div className="flex-1 flex items-center justify-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-xl font-medium">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Completed</span>
                      </div>
                      <Button
                        onClick={() => {
                          setDonationToDelete(donation._id);
                          setDeleteModalOpen(true);
                        }}
                        disabled={deleting}
                        variant="red"
                        className="flex-1 text-sm flex items-center justify-center gap-2"
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        title="Delete Donation"
        message="Are you sure you want to delete this completed donation? This action cannot be undone."
        deleting={deleting}
        onClose={() => {
          setDeleteModalOpen(false);
          setDonationToDelete(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
