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
    ? `${getImageUrl("donor", donor.profileImage)}?t=${Date.now()}`
    : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
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
    <div className="w-full max-w-5xl mx-10 py-20 px-2">
      <ToastContainer position="top-right" autoClose={3000} />

      <button
        onClick={() => router.push("/admin/donors")}
        className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to donors
      </button>

      {/* Main Wrapper: Flex Row */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT SIDE: Profile Picture & Basic Info */}
        <div className="lg:w-80 bg-white rounded-3xl border border-slate-200/60 shadow-lg p-8 flex flex-col items-center text-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-slate-50 shadow-inner bg-slate-100">
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
          <h1 className="text-xl font-bold text-slate-900">{donor.fullName}</h1>
          <p className="text-emerald-600 font-medium text-sm mb-4">
            @{donor.username}
          </p>

          {donor.role === "admin" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 text-[11px] font-bold uppercase text-emerald-700 bg-emerald-50 rounded-full border border-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5" /> System Admin
            </span>
          )}

          <button
            onClick={() => setConfirmDelete(true)}
            className="w-full mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors border border-red-100"
          >
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>
        </div>

        {/* RIGHT SIDE: Personal Information */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200/60 shadow-lg p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DetailRow icon={Mail} label="Email" value={donor.email} />
            <DetailRow icon={Phone} label="Phone" value={donor.phoneNumber} />
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
            <DetailRow
              icon={Calendar}
              label="Joined"
              value={
                donor.createdAt
                  ? new Date(donor.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "—"
              }
            />
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
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        {label}
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
          <Icon className="w-5 h-5 text-emerald-600" />
        </div>
        <p className="text-sm font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
