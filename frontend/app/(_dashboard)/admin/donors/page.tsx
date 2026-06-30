"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Search,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { getAllDonorsApi, AdminDonorRow } from "@/app/lib/api/admin.api";
import { deleteDonorAction } from "@/app/lib/actions/admin.actions";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";

const PAGE_SIZE = 7;

export default function AdminDonorsPage() {
  const router = useRouter();
  const [donors, setDonors] = useState<AdminDonorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [deleteTarget, setDeleteTarget] = useState<AdminDonorRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchDonors = useCallback(
    async (pageNum: number, searchTerm: string) => {
      setLoading(true);
      try {
        const res = await getAllDonorsApi({
          page: pageNum,
          limit: PAGE_SIZE,
          search: searchTerm,
        });
        setDonors(res.data);
        setTotalPages(res.meta?.totalPages || 1);
        setTotal(res.meta?.total || 0);
      } catch (err) {
        toast.error("Failed to load donors.");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchDonors(page, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchDonors(1, search);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await deleteDonorAction(deleteTarget._id);
    setDeleting(false);

    if (res.success) {
      toast.success("Donor deleted.");
      setDeleteTarget(null);
      fetchDonors(page, search);
    } else {
      toast.error(res.errors.root || "Failed to delete donor.");
    }
  };

  return (
    <div className="w-full space-y-6 py-8 px-2 md:px-6 max-w-7xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Donors
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            {total} registered donor{total === 1 ? "" : "s"}
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400"
          />
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm shadow-slate-100/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left">
                <th className="px-6 py-4 font-bold text-slate-400 text-xs uppercase tracking-widest">
                  Name
                </th>
                <th className="px-6 py-4 font-bold text-slate-400 text-xs uppercase tracking-widest">
                  Email
                </th>
                <th className="px-6 py-4 font-bold text-slate-400 text-xs uppercase tracking-widest">
                  Phone
                </th>
                <th className="px-6 py-4 font-bold text-slate-400 text-xs uppercase tracking-widest">
                  Joined
                </th>
                <th className="px-6 py-4 font-bold text-slate-400 text-xs uppercase tracking-widest text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-slate-400 text-sm"
                  >
                    Loading donors…
                  </td>
                </tr>
              ) : donors.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-slate-400 text-sm"
                  >
                    No donors found.
                  </td>
                </tr>
              ) : (
                donors.map((donor) => (
                  <tr
                    key={donor._id}
                    onClick={() => router.push(`/admin/donors/${donor._id}`)}
                    className="hover:bg-slate-50/40 transition-all duration-200 cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-800">
                        {donor.fullName}
                      </p>
                      <p className="text-xs text-slate-400">
                        @{donor.username}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{donor.email}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {donor.phoneNumber}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {donor.createdAt
                        ? new Date(donor.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/admin/donors/${donor._id}`);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-all duration-200"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteTarget(donor);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100/80 px-3 py-2 rounded-xl transition-all duration-200"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <span className="text-xs text-slate-400 font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      <DeleteConfirmationModal
        open={!!deleteTarget}
        title="Delete donor?"
        message={
          <>
            This will permanently remove{" "}
            <span className="font-bold text-red-600">
              {deleteTarget?.fullName}
            </span>
            's account. This can't be undone.
          </>
        }
        deleting={deleting}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
