"use client";

import { useEffect, useState } from "react";
import {
  getMyDonationsAction,
  deleteDonationAction,
} from "@/app/lib/actions/donation.actions";
import { Donation } from "@/app/lib/api/donation.api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Package,
  MapPin,
  Edit,
  Trash2,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import Button from "@/app/components/ui/button";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";
import { useRouter } from "next/navigation";

export default function DonationHistory() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [donationToDelete, setDonationToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const res = await getMyDonationsAction();
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

  const handleDelete = async () => {
    if (!donationToDelete) return;
    setDeleting(true);

    try {
      const res = await deleteDonationAction(donationToDelete);
      if (res.success) {
        toast.success("Donation deleted successfully");
        setDonations(donations.filter((d) => d._id !== donationToDelete));
        setDeleteModalOpen(false);
        setDonationToDelete(null);
      } else {
        toast.error(res.errors?.root || "Failed to delete donation");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setDeleting(false);
    }
  };

  const getStatusBadge = (adminStatus: string, claimStatus: string) => {
    if (adminStatus === "Rejected") {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs bg-red-50 border border-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
          <XCircle size={14} />
          Rejected
        </span>
      );
    }
    if (adminStatus === "Pending") {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs bg-yellow-50 border border-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
          <AlertCircle size={14} />
          Pending Approval
        </span>
      );
    }
    if (claimStatus === "Completed") {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-50 border border-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
          <CheckCircle size={14} />
          Completed
        </span>
      );
    }
    if (claimStatus === "Claimed") {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
          <Clock size={14} />
          Claimed
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-xs bg-green-50 border border-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
        <CheckCircle size={14} />
        Available
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-emerald-700">
        <div className="animate-pulse font-medium">Loading donations...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12 font-sans antialiased text-gray-800">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-emerald-600 font-serif">
              My Donations
            </h1>
            <p className="text-gray-500 mt-2">
              Manage and track your donations
            </p>
          </div>
          <Button
            onClick={() => router.push("/donor/create-donation")}
            variant="green"
            className="rounded-2xl"
          >
            Create New Donation
          </Button>
        </div>

        {donations.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-12 text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.04)]">
            <div className="bg-emerald-50 text-emerald-600 p-4 rounded-full inline-flex mb-4">
              <Package size={32} />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No donations yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start making a difference by creating your first donation
            </p>
            <Button
              onClick={() => router.push("/donor/create-donation")}
              variant="green"
              className="rounded-2xl"
            >
              Create Donation
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {donations.map((donation) => (
              <div
                key={donation._id}
                className="bg-white border border-gray-100 rounded-4xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] hover:shadow-lg transition"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {getStatusBadge(
                        donation.adminStatus,
                        donation.claimStatus,
                      )}
                      <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                        {donation.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {donation.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {donation.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Package size={16} />
                        <span>
                          {donation.quantity} {donation.unit}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span className="line-clamp-1">
                          {donation.pickupAddress}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>
                          {new Date(donation.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {donation.adminRejectionReason && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-xl">
                        <p className="text-xs text-red-700 font-medium">
                          Rejection Reason:
                        </p>
                        <p className="text-sm text-red-600">
                          {donation.adminRejectionReason}
                        </p>
                      </div>
                    )}

                    {donation.pointsEarned && donation.pointsEarned > 0 && (
                      <div className="mt-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                        <p className="text-sm text-emerald-700 font-medium">
                          Points Earned: {donation.pointsEarned}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex md:flex-col gap-2">
                    {donation.adminStatus === "Pending" && (
                      <Button
                        onClick={() =>
                          router.push(`/donor/history/${donation._id}`)
                        }
                        variant="secondary"
                        className="rounded-xl text-sm"
                      >
                        <Edit size={16} className="mr-2" />
                        Edit
                      </Button>
                    )}
                    <Button
                      onClick={() => {
                        setDonationToDelete(donation._id);
                        setDeleteModalOpen(true);
                      }}
                      variant="orange"
                      className="rounded-xl text-sm"
                      disabled={
                        donation.claimStatus === "Claimed" ||
                        donation.claimStatus === "Completed"
                      }
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>

                {donation.photos && donation.photos.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">
                      Photos
                    </p>
                    <div className="flex gap-3">
                      {donation.photos.slice(0, 3).map((photo, index) => (
                        <img
                          key={index}
                          src={`/uploads/donations/${photo}`}
                          alt={`Donation photo ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-xl"
                        />
                      ))}
                      {donation.photos.length > 3 && (
                        <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-sm text-gray-500 font-medium">
                          +{donation.photos.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setDonationToDelete(null);
        }}
        onConfirm={handleDelete}
        deleting={deleting}
        title="Delete Donation"
        message="Are you sure you want to delete this donation? This action cannot be undone."
      />
    </div>
  );
}
