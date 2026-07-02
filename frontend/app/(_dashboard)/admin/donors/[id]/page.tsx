"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ArrowLeft,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  User as UserIcon,
  Loader2,
} from "lucide-react";

import { getDonorByIdApi, AdminDonorRow } from "@/app/lib/api/admin.api";
import { deleteDonorAction } from "@/app/lib/actions/admin.actions";
import { getImageUrl } from "@/app/lib/utils/getImageUrl";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";

export default function AdminDonorDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [donor, setDonor] = useState<AdminDonorRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchDonor = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await getDonorByIdApi(id);
      setDonor(res.data);
    } catch (err) {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDonor();
  }, [fetchDonor]);

  const handleDelete = async () => {
    setDeleting(true);
    const res = await deleteDonorAction(id);
    setDeleting(false);

    if (res.success) {
      toast.success("Donor deleted successfully.");
      router.push("/admin/donors");
    } else {
      toast.error(res.errors?.root || "Failed to delete donor.");
      setConfirmDelete(false);
    }
  };

  const image = donor?.profileImage
    ? `${getImageUrl("profile", donor.profileImage)}?t=${Date.now()}`
    : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (notFound || !donor) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-slate-800">Donor not found</h2>
        <button
          onClick={() => router.push("/admin/donors")}
          className="mt-4 text-emerald-600 underline"
        >
          Return to list
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* LARGE MAIN CONTAINER */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm min-h-[80vh]">
        {/* TOP NAVIGATION & HEADER */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin/donors")}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to donors
          </button>
          <h1 className="text-2xl font-bold text-slate-800">Donor Profile</h1>
          <p className="text-slate-500 text-sm">
            View and manage donor information.
          </p>
        </div>

        {/* CONTENT SECTION */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-lg overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-emerald-500 to-teal-600" />

          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* SUB-CARD 1: Profile Summary (Left) */}
              <div className="relative md:w-1/3 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mt-16">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden border-[6px] border-white shadow-lg bg-slate-100">
                  {image ? (
                    <Image
                      src={image}
                      alt={donor.fullName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <UserIcon className="w-16 h-16 text-slate-400 m-auto mt-8" />
                  )}
                </div>

                <div className="text-center mt-16">
                  <h2 className="text-xl font-bold text-slate-900">
                    {donor.fullName}
                  </h2>
                  <p className="text-emerald-600 font-medium mb-6">
                    @{donor.username}
                  </p>

                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-all border border-red-100"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove Account
                  </button>
                </div>
              </div>

              {/* SUB-CARD 2: Detailed Info (Right) */}
              <div className="flex-1 bg-slate-50/50 rounded-3xl p-8 border border-slate-100 mt-0 md:mt-8">
                <h2 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                  Personal Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  <DetailRow
                    icon={Mail}
                    label="Email Address"
                    value={donor.email}
                  />
                  <DetailRow
                    icon={Phone}
                    label="Phone Number"
                    value={donor.phoneNumber}
                  />
                  <DetailRow
                    icon={UserIcon}
                    label="Gender"
                    value={donor.gender || "—"}
                  />
                  <DetailRow
                    icon={MapPin}
                    label="Location"
                    value={donor.address || "—"}
                  />
                  <div className="md:col-span-2">
                    <DetailRow
                      icon={Calendar}
                      label="Member Since"
                      value={
                        donor.createdAt
                          ? new Date(donor.createdAt).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )
                          : "—"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        open={confirmDelete}
        title="Delete donor?"
        message={
          <>
            This will permanently remove{" "}
            <span className="font-bold text-red-600">{donor.fullName}</span>'s
            account.
          </>
        }
        deleting={deleting}
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        {label}
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-100 shadow-sm">
          <Icon className="w-5 h-5 text-emerald-600" />
        </div>
        <p className="text-sm font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
