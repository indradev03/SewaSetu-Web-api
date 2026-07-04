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
  Building2,
  FileText,
  Download,
  ExternalLink,
} from "lucide-react";

import { getNGOByIdApi, NGO } from "@/app/lib/api/admin.api";
import {
  deleteNGOAction,
  verifyNGOAction,
} from "@/app/lib/actions/admin.actions";
import { getImageUrl } from "@/app/lib/utils/getImageUrl";
import DeleteConfirmationModal from "@/app/(_dashboard)/admin/components/donation/DeleteConfirmationModal";

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
      : `${getImageUrl("profile", ngo.profileImage)}?t=${Date.now()}`
    : null;

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );

  if (notFound || !ngo)
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

  return (
    <div className="p-6 max-w-8xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className=" w-full space-y-6 py-8 px-2  max-w-8xl mx-auto ">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight text-emerald-600 font-serif">
            Organization Profile
          </h1>
          <button
            onClick={() => router.back()}
            className="group flex mt-5 items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors font-medium text-sm"
          >
            <div className="p-2 bg-emerald-50 rounded-full group-hover:bg-emerald-100 transition-colors">
              <ArrowLeft size={18} />
            </div>
            Back to Ngos
          </button>
        </div>

        <div className="bg-white rounded-4xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="h-24 bg-linear-to-r from-emerald-500 to-teal-600" />

          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Card */}
              <div className="relative md:w-1/3 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mt-16">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-3xl overflow-hidden border-[6px] border-white shadow-lg bg-slate-100 flex items-center justify-center">
                  {image ? (
                    <Image
                      src={image}
                      alt={ngo.organizationName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <HeartHandshake className="w-16 h-16 text-emerald-400" />
                  )}
                </div>

                <div className="text-center mt-16">
                  <h2 className="text-xl font-bold text-slate-900">
                    {ngo.organizationName}
                  </h2>
                  <p className="text-emerald-600 font-medium mb-4">
                    {ngo.email}
                  </p>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 mb-6 text-[10px] font-bold uppercase rounded-full border ${ngo.isVerified ? "text-emerald-700 bg-emerald-50 border-emerald-100" : "text-amber-700 bg-amber-50 border-amber-100"}`}
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

                  <div className="space-y-3">
                    <button
                      onClick={handleToggleVerify}
                      className="w-full py-3 rounded-2xl text-sm font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 transition-all"
                    >
                      {verifying
                        ? "Updating..."
                        : ngo.isVerified
                          ? "Unverify Organization"
                          : "Verify Organization"}
                    </button>
                    <button
                      onClick={() => setConfirmDelete(true)}
                      className="w-full py-3 rounded-2xl text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4 inline mr-2" /> Delete NGO
                    </button>
                  </div>
                </div>
              </div>

              {/* Details Card */}
              <div className="flex-1 bg-slate-50/50 rounded-3xl p-8 border border-slate-100 mt-8">
                <h2 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2">
                  <Building2 className="text-emerald-500" /> Organization
                  Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  <DetailRow
                    icon={UserIcon}
                    label="Contact Person"
                    value={ngo.contactPerson}
                  />
                  <DetailRow
                    icon={Mail}
                    label="Email Address"
                    value={ngo.email}
                  />
                  <DetailRow
                    icon={Hash}
                    label="Registration No."
                    value={ngo.registrationNumber}
                  />
                  <DetailRow
                    icon={Calendar}
                    label="Established"
                    value={ngo.yearEstablished}
                  />
                  <DetailRow
                    icon={MapPin}
                    label="Office Address"
                    value={ngo.address || "—"}
                  />
                  <DetailRow
                    icon={Calendar}
                    label="Joined Date"
                    value={
                      ngo.createdAt
                        ? new Date(ngo.createdAt).toLocaleDateString()
                        : "—"
                    }
                  />
                </div>
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    Impact Description
                  </p>
                  <p className="text-slate-600 leading-relaxed text-sm bg-white p-4 rounded-xl border border-slate-100">
                    {ngo.impactDescription || "No description provided."}
                  </p>
                </div>

                {/* Verification Documents */}
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                    Verification Documents
                  </p>
                  {ngo.registrationDocPath || ngo.panCardPath ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {ngo.registrationDocPath && (
                        <DocumentCard
                          title="Registration Document"
                          path={ngo.registrationDocPath}
                        />
                      )}
                      {ngo.panCardPath && (
                        <DocumentCard title="PAN Card" path={ngo.panCardPath} />
                      )}
                    </div>
                  ) : (
                    <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 text-center">
                      <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-sm text-slate-500">
                        No verification documents uploaded
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        open={confirmDelete}
        title="Delete NGO?"
        message={
          <>
            Permanently remove{" "}
            <span className="font-bold text-red-600">
              {ngo.organizationName}
            </span>{" "}
            and its data?
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
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-xl bg-white border border-slate-100 text-emerald-600 shadow-sm">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}

function DocumentCard({ title, path }: { title: string; path: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-emerald-300 transition-all duration-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
          <FileText size={18} />
        </div>
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      </div>

      {/* Simplified Preview Area to match your design */}
      <div className="h-40 bg-slate-50 flex items-center justify-center">
        <FileText className="w-16 h-16 text-slate-200" />
      </div>

      {/* Action Link */}
      <div className="p-4 bg-white border-t border-slate-100">
        <a
          href={path}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          <ExternalLink size={14} />
          Open in New Tab
        </a>
      </div>
    </div>
  );
}
