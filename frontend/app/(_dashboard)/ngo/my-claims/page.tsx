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
  X,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  ShieldCheck,
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
import StatusBadge from "@/app/components/ui/StatusBadge";

export default function NGOMyClaimsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [donationToDelete, setDonationToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  const handleViewDetails = (donation: Donation) => {
    setSelectedDonation(donation);
    setCurrentImageIndex(0);
    setShowDetailsModal(true);
  };

  const nextImage = () => {
    if (selectedDonation && selectedDonation.photos && selectedDonation.photos.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedDonation.photos.length);
    }
  };

  const prevImage = () => {
    if (selectedDonation && selectedDonation.photos && selectedDonation.photos.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + selectedDonation.photos.length) % selectedDonation.photos.length,
      );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "text-emerald-700 bg-emerald-50/80 border-emerald-200/60";
      case "Claimed":
        return "text-green-700 bg-green-50/80 border-green-200/60";
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
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-500 rounded-full animate-spin mx-auto" />
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
    <div className="w-full space-y-6 py-8 px-2  max-w-8xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-semibold tracking-tight text-emerald-600 font-serif">
            My Claimed Donations
          </h1>
          <p className="text-gray-500 mt-2">
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
                ? "bg-green-500 text-white"
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
              onClick={() => handleViewDetails(donation)}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Image */}
              {donation.photos && donation.photos.length > 0 ? (
                <div className="w-full h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={`/uploads/donations/${donation.photos[0]}`}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePickup(donation._id);
                        }}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRelease(donation._id);
                        }}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleComplete(donation._id);
                        }}
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
                        onClick={(e) => {
                          e.stopPropagation();
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

      {/* Donation Details Modal */}
      {showDetailsModal && selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 overflow-y-auto py-8">
          <div className="w-full max-w-4xl rounded-4xl bg-white shadow-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-3xl font-semibold tracking-tight text-emerald-600 font-serif">
                Donation Details
              </h2>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedDonation(null);
                }}
                className="group flex h-9 w-9 items-center justify-center rounded-full bg-red-100 transition-colors hover:bg-red-600"
              >
                <X className="h-5 w-5 text-red-600 transition-colors group-hover:text-white" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Images */}
                <div>
                  {selectedDonation.photos && selectedDonation.photos.length > 0 ? (
                    <div className="relative">
                      <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                        <img
                          src={`/uploads/donations/${selectedDonation.photos[currentImageIndex]}`}
                          alt={`Donation photo ${currentImageIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {selectedDonation.photos.length > 1 && (
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
                      {selectedDonation.photos.length > 1 && (
                        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                          {selectedDonation.photos.map((photo, index) => (
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
                            {selectedDonation.title}
                          </h2>
                          <div className="flex items-center gap-2 mt-2">
                            <StatusBadge status={selectedDonation.status} />
                            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                              {selectedDonation.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed">
                        {selectedDonation.description}
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Package size={16} className="text-gray-400" />
                          <span>
                            {selectedDonation.quantity} {selectedDonation.unit}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={16} className="text-gray-400" />
                          <span>
                            {new Date(selectedDonation.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin size={16} className="text-gray-400 mt-0.5" />
                        <span className="line-clamp-2">
                          {selectedDonation.pickupAddress}
                        </span>
                      </div>

                      {selectedDonation.claimedAt && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={16} className="text-gray-400" />
                          <span>
                            Claimed on {new Date(selectedDonation.claimedAt).toLocaleDateString()}
                          </span>
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
                        {selectedDonation.donorId.profileImage ? (
                          <img
                            src={`/uploads/profile/${selectedDonation.donorId.profileImage}`}
                            alt={selectedDonation.donorId.fullName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                            <User className="w-6 h-6 text-emerald-600" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            {selectedDonation.donorId.fullName}
                          </p>
                          <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                            <Mail size={16} className="text-emerald-600" />
                            <span>{selectedDonation.donorId.email}</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-3 pt-2 border-t border-emerald-200">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone size={16} className="text-emerald-600" />
                          <span>{selectedDonation.donorId.phoneNumber}</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <MapPin
                            size={16}
                            className="text-emerald-600 mt-0.5 shrink-0"
                          />
                          <span className="line-clamp-2">
                            {selectedDonation.pickupAddress}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mt-3">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <p className="text-xs text-blue-700 font-medium">
                        Handled by Admin
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons based on status */}
                  <div className="pt-4 border-t border-gray-200">
                    {selectedDonation.status === "Claimed" && (
                      <div className="flex gap-3">
                        <Button
                          onClick={() => {
                            handlePickup(selectedDonation._id);
                            setShowDetailsModal(false);
                          }}
                          disabled={actionLoading === selectedDonation._id}
                          className="flex-1 bg-amber-500 hover:bg-amber-400 text-white py-3 rounded-2xl text-sm font-medium"
                        >
                          {actionLoading === selectedDonation._id ? (
                            "Updating..."
                          ) : (
                            <>
                              <Truck className="w-4 h-4 mr-2" /> Mark as Picked Up
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={() => {
                            handleRelease(selectedDonation._id);
                            setShowDetailsModal(false);
                          }}
                          disabled={actionLoading === selectedDonation._id}
                          variant="red"
                          className="flex-1 py-3 rounded-2xl text-sm font-medium"
                        >
                          {actionLoading === selectedDonation._id ? (
                            "Updating..."
                          ) : (
                            "Release Claim"
                          )}
                        </Button>
                      </div>
                    )}

                    {selectedDonation.status === "PickedUp" && (
                      <Button
                        onClick={() => {
                          handleComplete(selectedDonation._id);
                          setShowDetailsModal(false);
                        }}
                        disabled={actionLoading === selectedDonation._id}
                        className="w-full bg-green-500 hover:bg-green-400 text-white py-3 rounded-2xl text-sm font-medium"
                      >
                        {actionLoading === selectedDonation._id ? (
                          "Updating..."
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2" /> Mark as Completed
                          </>
                        )}
                      </Button>
                    )}

                    {selectedDonation.status === "Completed" && (
                      <Button
                        onClick={() => {
                          setDonationToDelete(selectedDonation._id);
                          setShowDetailsModal(false);
                          setDeleteModalOpen(true);
                        }}
                        disabled={deleting}
                        variant="red"
                        className="w-full py-3 rounded-2xl text-sm font-medium"
                      >
                        Delete Donation
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
