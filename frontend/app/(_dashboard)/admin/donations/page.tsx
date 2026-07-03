"use client";

import { useEffect, useState } from "react";
import { getPendingDonationsAction, approveRejectDonationAction } from "@/app/lib/actions/donation.actions";
import { Donation } from "@/app/lib/api/donation.api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Package, MapPin, Check, X, Calendar, Clock, AlertCircle, User } from "lucide-react";
import Button from "@/app/components/ui/button";

export default function AdminDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [rejectionReasons, setRejectionReasons] = useState<Record<string, string>>({});
  const [showRejectionInput, setShowRejectionInput] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchPendingDonations();
  }, []);

  const fetchPendingDonations = async () => {
    setLoading(true);
    try {
      const res = await getPendingDonationsAction();
      if (res.success) {
        setDonations(res.data!.donations);
      } else {
        toast.error("Failed to fetch pending donations");
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
        setDonations(donations.filter((d) => d._id !== id));
      } else {
        toast.error(res.errors?.root || "Failed to approve donation");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (id: string) => {
    const reason = rejectionReasons[id];
    if (!reason || reason.trim().length === 0) {
      toast.error("Please provide a rejection reason");
      return;
    }

    setProcessing(id);
    try {
      const res = await approveRejectDonationAction(id, "Rejected", reason);
      if (res.success) {
        toast.success("Donation rejected successfully");
        setDonations(donations.filter((d) => d._id !== id));
        setRejectionReasons({ ...rejectionReasons, [id]: "" });
        setShowRejectionInput({ ...showRejectionInput, [id]: false });
      } else {
        toast.error(res.errors?.root || "Failed to reject donation");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-emerald-700">
        <div className="animate-pulse font-medium">Loading pending donations...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12 font-sans antialiased text-gray-800">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight text-emerald-600 font-serif">
            Pending Donations
          </h1>
          <p className="text-gray-500 mt-2">Review and approve or reject donation requests</p>
        </div>

        {donations.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-12 text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.04)]">
            <div className="bg-emerald-50 text-emerald-600 p-4 rounded-full inline-flex mb-4">
              <Check size={32} />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">All caught up!</h3>
            <p className="text-gray-500">No pending donations to review</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {donations.map((donation) => (
              <div
                key={donation._id}
                className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] hover:shadow-lg transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center gap-1.5 text-xs bg-yellow-50 border border-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
                        <AlertCircle size={14} />
                        Pending Approval
                      </span>
                      <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                        {donation.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{donation.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{donation.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Package size={16} />
                        <span>{donation.quantity} {donation.unit}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span className="line-clamp-1">{donation.pickupAddress}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{new Date(donation.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Donor Info */}
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-4">
                      <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full">
                        <User size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Donor</p>
                        <p className="text-sm font-medium text-gray-900">{donation.donorId.fullName}</p>
                        <p className="text-xs text-gray-500">{donation.donorId.email}</p>
                      </div>
                    </div>

                    {/* Photos */}
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

                  <div className="flex lg:flex-col gap-3 min-w-[200px]">
                    <Button
                      onClick={() => handleApprove(donation._id)}
                      variant="green"
                      className="rounded-xl text-sm"
                      disabled={processing === donation._id}
                    >
                      <Check size={16} className="mr-2" />
                      {processing === donation._id ? "Processing..." : "Approve"}
                    </Button>

                    {!showRejectionInput[donation._id] ? (
                      <Button
                        onClick={() => setShowRejectionInput({ ...showRejectionInput, [donation._id]: true })}
                        variant="orange"
                        className="rounded-xl text-sm"
                        disabled={processing === donation._id}
                      >
                        <X size={16} className="mr-2" />
                        Reject
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        <textarea
                          className="w-full bg-white border border-gray-200 text-gray-800 px-3 py-2 rounded-xl text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/10 focus:outline-none transition resize-none"
                          rows={3}
                          placeholder="Enter rejection reason..."
                          value={rejectionReasons[donation._id] || ""}
                          onChange={(e) =>
                            setRejectionReasons({ ...rejectionReasons, [donation._id]: e.target.value })
                          }
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={() => {
                              setShowRejectionInput({ ...showRejectionInput, [donation._id]: false });
                              setRejectionReasons({ ...rejectionReasons, [donation._id]: "" });
                            }}
                            variant="secondary"
                            className="flex-1 rounded-xl text-xs py-2"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => handleReject(donation._id)}
                            variant="orange"
                            className="flex-1 rounded-xl text-xs py-2"
                            disabled={processing === donation._id}
                          >
                            {processing === donation._id ? "Rejecting..." : "Confirm"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
