"use client";

import { JSX, useEffect, useState } from "react";
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
  XCircle,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import Button from "@/app/components/ui/button";
import DeleteConfirmationModal from "@/app/(_dashboard)/admin/components/donation/DeleteConfirmationModal";
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
      if (res.success) setDonations(res.data!.donations);
      else toast.error("Failed to fetch donations");
    } catch {
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
        toast.success("Donation deleted");
        setDonations(donations.filter((d) => d._id !== donationToDelete));
        setDeleteModalOpen(false);
      } else toast.error(res.errors?.root || "Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  const StatusBadge = ({ admin, status }: { admin: string; status: string }) => {
    const configs: Record<
      string,
      { color: string; icon: JSX.Element; label: string }
    > = {
      Rejected: {
        color: "bg-red-50 text-red-700 border-red-100",
        icon: <XCircle size={14} />,
        label: "Rejected",
      },
      Pending: {
        color: "bg-amber-50 text-amber-700 border-amber-100",
        icon: <AlertCircle size={14} />,
        label: "Pending",
      },
      Available: {
        color: "bg-emerald-50 text-emerald-700 border-emerald-100",
        icon: <CheckCircle size={14} />,
        label: "Available",
      },
      Claimed: {
        color: "bg-blue-50 text-blue-700 border-blue-100",
        icon: <Clock size={14} />,
        label: "Claimed",
      },
      PickedUp: {
        color: "bg-amber-50 text-amber-700 border-amber-100",
        icon: <Package size={14} />,
        label: "Picked Up",
      },
      Completed: {
        color: "bg-purple-50 text-purple-700 border-purple-100",
        icon: <CheckCircle size={14} />,
        label: "Completed",
      },
    };
    const c = configs[admin] ||
      configs[status] || {
        color: "bg-slate-100 text-slate-700 border-slate-200",
        icon: <CheckCircle size={14} />,
        label: "Available",
      };
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${c.color}`}
      >
        {c.icon} {c.label}
      </span>
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="w-full max-w-8xl mx-auto px-4 py-8">
      <ToastContainer position="top-right" />
      <div className="max-w-8xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-emerald-600 font-serif">
              My Donations
            </h1>
            <p className="text-gray-500 mt-2">
              Track your contributions to the community
            </p>
          </div>
          <div className="flex items-center">
            <Button
              onClick={() => router.push("/donor/create-donation")}
              variant="green"
              className="px-8 py-3 shadow-lg hover:shadow-emerald-200 transition-all"
            >
              + Create New Donation
            </Button>
          </div>
        </div>

        {donations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <Package size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-medium">No donations yet</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((d) => (
              <div
                key={d._id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4"
              >
                <div className="flex justify-between items-start">
                  <StatusBadge admin={d.adminStatus} status={d.status} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {d.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {d.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-2">
                    {d.description}
                  </p>
                </div>

                {d.photos && d.photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {d.photos.map((photo, idx) => (
                      <img
                        key={idx}
                        src={`/uploads/donations/${photo}`}
                        alt={`${d.title} ${idx + 1}`}
                        className="w-full h-20 object-cover rounded-xl border border-slate-100"
                      />
                    ))}
                  </div>
                )}

                {/* Status-specific Alerts */}
                {d.adminRejectionReason && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                    <p className="text-xs text-red-700 font-medium">
                      Rejection Reason:
                    </p>
                    <p className="text-sm text-red-600">
                      {d.adminRejectionReason}
                    </p>
                  </div>
                )}

                {/* NGO Claim Information */}
                {d.claimedByNgoId && (
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl space-y-2">
                    <p className="text-xs text-blue-700 font-semibold flex items-center gap-1.5">
                      <CheckCircle size={12} />
                      Claimed by NGO
                    </p>
                    <p className="text-sm text-blue-900 font-medium">
                      {d.claimedByNgoId.organizationName}
                    </p>
                    <p className="text-xs text-blue-600">
                      {d.claimedByNgoId.email}
                    </p>
                    {d.claimedAt && (
                      <p className="text-[10px] text-blue-500">
                        Claimed: {new Date(d.claimedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}

                {/* Reward Points */}
                {d.rewardPointsAwarded && d.rewardPointsAwarded > 0 && (
                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <p className="text-sm text-emerald-700 font-medium flex items-center gap-1.5">
                      <span className="text-lg">🎉</span>
                      You earned {d.rewardPointsAwarded} reward points!
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 mt-auto pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Package size={14} /> {d.quantity} {d.unit}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} /> {d.pickupAddress.substring(0, 15)}...
                  </div>
                </div>

                <div className="flex gap-2 border-t pt-4">
                  {d.adminStatus === "Pending" && (
                    <Button
                      onClick={() => router.push(`/donor/history/${d._id}`)}
                      variant="green"
                      className="flex-1"
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      setDonationToDelete(d._id);
                      setDeleteModalOpen(true);
                    }}
                    variant="red"
                    className="flex-1"
                  >
                    Delete
                  </Button>
                </div>
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
