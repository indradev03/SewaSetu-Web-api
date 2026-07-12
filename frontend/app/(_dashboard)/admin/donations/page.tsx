"use client";

import { useEffect, useState } from "react";
import {
  getAllDonationsAction,
  approveRejectDonationAction,
  adminDeleteDonationAction,
} from "@/app/lib/actions/donation.actions";
import { Donation } from "@/app/lib/api/donation.api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Search,
  Package,
  MapPin,
  Calendar,
  User,
  Inbox,
  Eye,
  Trash2,
  Check,
  X,
} from "lucide-react";
import StatusBadge from "@/app/components/ui/StatusBadge";
import DonationDetailsModal from "@/app/(_dashboard)/admin/components/donation/DonationDetailsModal";
import RejectConfirmationModal from "@/app/(_dashboard)/admin/components/donation/RejectConfirmationModal";
import ApproveConfirmationModal from "@/app/(_dashboard)/admin/components/donation/ApproveConfirmationModal";
import DeleteConfirmationModal from "@/app/(_dashboard)/admin/components/donation/DeleteConfirmationModal";

type StatusFilter =
  | "All"
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Available"
  | "Claimed"
  | "PickedUp"
  | "Completed";
type CategoryFilter = "All" | "Food" | "Clothes" | "Others";

export default function AdminDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");

  // Modal states
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(
    null,
  );
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    fetchAllDonations();
  }, []);

  const fetchAllDonations = async () => {
    setLoading(true);
    try {
      const res = await getAllDonationsAction();
      if (res.success) {
        setDonations(res.data!.donations);
      } else {
        toast.error("Failed to fetch donations");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    setProcessing(id);
    try {
      const res = await approveRejectDonationAction(id, "Approved");
      if (res.success) {
        toast.success("Donation approved successfully");
        setDonations(
          donations.map((d) => (d._id === id ? res.data!.donation : d)),
        );
        setShowApproveModal(false);
        setShowDetailsModal(false);
      } else {
        toast.error(res.errors?.root || "Failed to approve donation");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (id: string, reason: string) => {
    if (!reason || reason.trim().length === 0) {
      toast.error("Please provide a rejection reason");
      return;
    }

    setProcessing(id);
    try {
      const res = await approveRejectDonationAction(id, "Rejected", reason);
      if (res.success) {
        toast.success("Donation rejected successfully");
        setDonations(
          donations.map((d) => (d._id === id ? res.data!.donation : d)),
        );
        setShowRejectModal(false);
        setShowDetailsModal(false);
        setRejectionReason("");
      } else {
        toast.error(res.errors?.root || "Failed to reject donation");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setProcessing(null);
    }
  };

  const handleDelete = async (id: string) => {
    setProcessing(id);
    try {
      const res = await adminDeleteDonationAction(id);
      if (res.success) {
        toast.success("Donation deleted successfully");
        setDonations(donations.filter((d) => d._id !== id));
        setShowDeleteModal(false);
        setShowDetailsModal(false);
        setSelectedDonation(null);
      } else {
        toast.error(res.errors?.root || "Failed to delete donation");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setProcessing(null);
    }
  };

  const openDetailsModal = (donation: Donation) => {
    setSelectedDonation(donation);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedDonation(null);
  };

  const openRejectModal = () => {
    setShowRejectModal(true);
  };

  const closeRejectModal = () => {
    setShowRejectModal(false);
    setRejectionReason("");
  };

  const confirmReject = () => {
    if (selectedDonation) {
      handleReject(selectedDonation._id, rejectionReason);
    }
  };

  const openApproveModal = () => {
    setShowApproveModal(true);
  };

  const closeApproveModal = () => {
    setShowApproveModal(false);
  };

  const confirmApprove = () => {
    if (selectedDonation) {
      handleApprove(selectedDonation._id);
    }
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const confirmDelete = () => {
    if (selectedDonation) {
      handleDelete(selectedDonation._id);
    }
  };

  // Filter donations
  const filteredDonations = donations.filter((donation) => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      donation.title.toLowerCase().includes(searchLower) ||
      donation.donorId.fullName.toLowerCase().includes(searchLower) ||
      donation.category.toLowerCase().includes(searchLower) ||
      donation.pickupAddress.toLowerCase().includes(searchLower);

    // Status filter - check both adminStatus and status fields
    const matchesStatus =
      statusFilter === "All" ||
      donation.adminStatus === statusFilter ||
      donation.status === statusFilter;

    // Category filter
    const matchesCategory =
      categoryFilter === "All" || donation.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Loading skeleton
  if (loading) {
    return (
      <div className=" w-full space-y-6 py-8 px-2 md:px-6 max-w-8xl mx-auto font-sans antialiased text-gray-800">
        <div className="mb-8">
          <div className="h-10 bg-gray-200 rounded-lg w-64 animate-pulse mb-3"></div>
          <div className="h-5 bg-gray-200 rounded-lg w-96 animate-pulse"></div>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 space-y-3">
            <div className="h-10 bg-gray-200 rounded-lg w-full animate-pulse"></div>
            <div className="flex gap-3">
              <div className="h-10 bg-gray-200 rounded-lg w-40 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded-lg w-40 animate-pulse"></div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-xl animate-pulse shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded-lg w-20 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded-lg w-24 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" w-full space-y-6 py-8 px-2  max-w-8xl mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

      <div className="max-w-8xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight text-emerald-600 font-serif">
            Donation Management
          </h1>
          <p className="text-gray-500 mt-2">
            Review and manage all donation requests.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, donor, category, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 focus:outline-none transition"
              />
            </div>

            {/* Status Filter */}
            <div className="lg:w-48">
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as StatusFilter)
                }
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 focus:outline-none transition cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-size-[0.75rem_0.75rem] bg-position-[right_1rem_center] bg-no-repeat pr-10"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Available">Available</option>
                <option value="Claimed">Claimed</option>
                <option value="PickedUp">Picked Up</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(e.target.value as CategoryFilter)
                }
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 focus:outline-none transition cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-size-[0.75rem_0.75rem] bg-position-[right_1rem_center] bg-no-repeat pr-10"
              >
                <option value="All">All Categories</option>
                <option value="Food">Food</option>
                <option value="Clothes">Clothes</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          {filteredDonations.length === 0 ? (
            <div className="p-12 text-center">
              <div className="bg-gray-100 text-gray-400 p-4 rounded-2xl inline-flex mb-4">
                <Inbox size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No donations found
              </h3>
              <p className="text-gray-500">
                {donations.length === 0
                  ? "There are no donations to display."
                  : "Try adjusting your search or filters."}
              </p>
            </div>
          ) : (
            <div className="max-h-150 overflow-y-auto overflow-x-hidden">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-6 px-6 py-4 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0 z-10">
                <div className="col-span-1 flex ">Image</div>
                <div className="col-span-3 flex ">Title</div>
                <div className="col-span-1 flex ">Category</div>
                <div className="col-span-1 flex ">Quantity</div>
                <div className="col-span-3 flex ">Pickup Address</div>
                <div className="col-span-1 flex justify-center">Status</div>
                <div className="col-span-2 flex justify-center ">Actions</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-100">
                {filteredDonations.map((donation) => (
                  <div
                    key={donation._id}
                    className="md:grid md:grid-cols-12 gap-6 px-6 py-4 hover:bg-gray-50 transition items-center"
                  >
                    {/* Image */}
                    <div className="col-span-1 shrink-0">
                      {donation.photos && donation.photos.length > 0 ? (
                        <img
                          src={`/uploads/donations/${donation.photos[0]}`}
                          alt={donation.title}
                          className="w-12 h-12 rounded-xl object-cover shadow-sm"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shadow-sm">
                          <Package className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <div className="col-span-3 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {donation.title}
                      </p>
                      <p className="text-xs text-gray-500 md:hidden">
                        {donation.category}
                      </p>
                    </div>

                    {/* Category */}
                    <div className="col-span-1 hidden md:block">
                      <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">
                        {donation.category}
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-1">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Package size={14} className="text-gray-400" />
                        <span className="font-medium">
                          {donation.quantity} {donation.unit}
                        </span>
                      </div>
                    </div>

                    {/* Pickup Address */}
                    <div className="col-span-3 min-w-0">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin size={14} className="text-gray-400 shrink-0" />
                        <span className="truncate">
                          {donation.pickupAddress}
                        </span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-1">
                      <StatusBadge status={donation.adminStatus} />
                    </div>

                    {/* Actions */}
                    <div className="col-span-2">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => openDetailsModal(donation)}
                          className="flex items-center gap-1 px-2 py-1.5 
                            bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium hover:bg-emerald-100 transition-colors"
                          disabled={processing === donation._id}
                        >
                          <Eye size={14} />
                          View
                        </button>

                        {donation.adminStatus === "Pending" && (
                          <>
                            <button
                              onClick={() => {
                                setSelectedDonation(donation);
                                openApproveModal();
                              }}
                              className="flex items-center justify-center w-7 h-7 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors"
                              disabled={processing === donation._id}
                            >
                              <Check size={14} />
                            </button>

                            <button
                              onClick={() => {
                                setSelectedDonation(donation);
                                openRejectModal();
                              }}
                              className="flex items-center justify-center w-7 h-7 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                              disabled={processing === donation._id}
                            >
                              <X size={14} />
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => {
                            setSelectedDonation(donation);
                            openDeleteModal();
                          }}
                          className="flex items-center justify-center w-7 h-7 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                          disabled={processing === donation._id}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Donation Details Modal */}
      <DonationDetailsModal
        open={showDetailsModal}
        donation={selectedDonation}
        processing={processing === selectedDonation?._id}
        onClose={closeDetailsModal}
        onApprove={openApproveModal}
        onReject={openRejectModal}
        onDelete={openDeleteModal}
      />

      {/* Reject Confirmation Modal */}
      <RejectConfirmationModal
        open={showRejectModal}
        rejectionReason={rejectionReason}
        processing={processing === selectedDonation?._id}
        onClose={closeRejectModal}
        onReasonChange={setRejectionReason}
        onConfirm={confirmReject}
      />

      {/* Approve Confirmation Modal */}
      <ApproveConfirmationModal
        open={showApproveModal}
        processing={processing === selectedDonation?._id}
        onClose={closeApproveModal}
        onConfirm={confirmApprove}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={showDeleteModal}
        title="Delete Donation"
        message="Are you sure you want to permanently delete this donation? This action cannot be undone."
        deleting={processing === selectedDonation?._id}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
