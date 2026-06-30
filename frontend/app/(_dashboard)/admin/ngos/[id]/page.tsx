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
  BadgeCheck,
  Clock,
  HeartHandshake,
  Hash,
  User as UserIcon,
  Loader2,
} from "lucide-react";

import { getNGOByIdApi, NGO } from "@/app/lib/api/admin.api";
import {
  deleteNGOAction,
  verifyNGOAction,
} from "@/app/lib/actions/admin.actions";
import { getImageUrl } from "@/app/lib/utils/getImageUrl";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";

export default function AdminNGODetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [ngo, setNgo] = useState<NGO | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const fetchNGO = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await getNGOByIdApi(id);
      setNgo(res.data);
    } catch (err) {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchNGO();
  }, [fetchNGO]);

  const handleToggleVerify = async () => {
    if (!ngo) return;
    setVerifying(true);
    const res = await verifyNGOAction(ngo._id, !ngo.isVerified);
    setVerifying(false);

    if (res.success) {
      toast.success(ngo.isVerified ? "NGO unverified." : "NGO verified.");
      fetchNGO();
    } else {
      toast.error(res.errors?.root || "Failed to update NGO.");
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    const res = await deleteNGOAction(id);
    setDeleting(false);

    if (res.success) {
      toast.success("NGO deleted.");
      router.push("/admin/ngos");
    } else {
      toast.error(res.errors?.root || "Failed to delete NGO.");
      setConfirmDelete(false);
    }
  };

  const image = ngo?.profileImage
    ? ngo.profileImage.startsWith("http")
      ? `${ngo.profileImage}?t=${Date.now()}`
      : `${getImageUrl("ngo", ngo.profileImage)}?t=${Date.now()}`
    : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (notFound || !ngo) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-slate-800">NGO not found</h2>
        <button
          onClick={() => router.push("/admin/ngos")}
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
        onClick={() => router.push("/admin/ngos")}
        className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Ngos
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT: Branding/Status */}
        <div className="lg:w-80 bg-white rounded-3xl border border-slate-200/60 shadow-lg p-8 flex flex-col items-center text-center">
          <div className="relative w-32 h-32 rounded-3xl overflow-hidden mb-6 border-4 border-slate-50 shadow-inner bg-slate-100 flex items-center justify-center">
            {image ? (
              <Image
                src={image}
                alt={ngo.organizationName}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <HeartHandshake size={48} className="text-emerald-400" />
            )}
          </div>

          <h1 className="text-xl font-bold text-slate-900">
            {ngo.organizationName}
          </h1>
          <p className="text-emerald-600 font-medium text-sm mb-4">
            {ngo.email}
          </p>

          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 mb-6 text-[11px] font-bold uppercase rounded-full border ${
              ngo.isVerified
                ? "text-emerald-700 bg-emerald-50 border-emerald-100"
                : "text-amber-700 bg-amber-50 border-amber-100"
            }`}
          >
            {ngo.isVerified ? (
              <>
                <BadgeCheck size={14} /> Verified
              </>
            ) : (
              <>
                <Clock size={14} /> Pending
              </>
            )}
          </span>

          <div className="w-full flex flex-col gap-2 mt-auto">
            <button
              onClick={handleToggleVerify}
              className="w-full px-5 py-3 rounded-xl text-sm font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-100"
            >
              {verifying
                ? "Updating..."
                : ngo.isVerified
                  ? "Unverify Organization"
                  : "Verify Organization"}
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              className="w-full px-5 py-3 rounded-xl text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors border border-red-100"
            >
              Delete NGO
            </button>
          </div>
        </div>

        {/* RIGHT: Detailed Info */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200/60 shadow-lg p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
            Organization Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DetailRowLarge
              icon={UserIcon}
              label="Contact Person"
              value={ngo.contactPerson}
            />
            <DetailRowLarge
              icon={Mail}
              label="Email Address"
              value={ngo.email}
            />
            <DetailRowLarge
              icon={Hash}
              label="Registration No."
              value={ngo.registrationNumber}
            />
            <DetailRowLarge
              icon={Calendar}
              label="Established"
              value={ngo.yearEstablished}
            />
            <DetailRowLarge
              icon={MapPin}
              label="Office Address"
              value={ngo.address || "—"}
            />
            <DetailRowLarge
              icon={Calendar}
              label="Joined Date"
              value={
                ngo.createdAt
                  ? new Date(ngo.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "—"
              }
            />
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
              Impact Description
            </p>
            <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-xl">
              {ngo.impactDescription || "No description provided."}
            </p>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        open={confirmDelete}
        title="Delete NGO?"
        message={
          <>
            This will permanently remove{" "}
            <span className="font-bold text-red-600">
              {ngo.organizationName}
            </span>{" "}
            and all associated data.
          </>
        }
        deleting={deleting}
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

function DetailRowLarge({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
