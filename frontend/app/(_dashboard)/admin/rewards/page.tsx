"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import "react-toastify/dist/ReactToastify.css";
import { Search, Plus, RefreshCw } from "lucide-react";

import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";
import RewardTable from "../components/rewards/RewardTable";
import {
  deleteReward,
  getAllRewards,
  Reward,
  toggleRewardStatus,
} from "@/app/lib/api/rewards.api";
import { toast, ToastContainer } from "react-toastify";

const PAGE_SIZE = 7;

export default function AdminRewardsPage() {
  const router = useRouter();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<Reward | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchRewards = useCallback(
    async (pageNum: number, searchTerm: string) => {
      setLoading(true);
      try {
        const res = await getAllRewards({
          page: pageNum,
          limit: PAGE_SIZE,
          search: searchTerm,
        });
        setRewards(res.data);
        setTotalPages(res.meta.totalPages || 1);
        setTotal(res.meta.total || 0);
      } catch {
        toast.error("Failed to load rewards");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchRewards(page, search);
  }, [page, fetchRewards]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchRewards(1, search);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await deleteReward(deleteTarget._id);
    setDeleting(false);
    if (res.success) {
      toast.success("Reward deleted");
      setDeleteTarget(null);
      fetchRewards(page, search);
    } else {
      toast.error(res.errors?.root || "Failed to delete reward");
    }
  };

  const handleToggle = async (id: string) => {
    const res = await toggleRewardStatus(id);
    if (res.success) {
      fetchRewards(page, search);
    } else {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="w-full max-w-8xl mx-auto px-4 py-8">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Rewards
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and configure your reward system.
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/rewards/create")}
          className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-all shadow-sm"
        >
          <Plus size={18} /> Create Reward
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <form onSubmit={handleSearch} className="relative max-w-sm">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
            />
          </form>
        </div>

        <RewardTable
          rewards={rewards}
          loading={loading}
          onEdit={(id) => router.push(`/admin/rewards/${id}`)}
          onDelete={(reward) => setDeleteTarget(reward)}
          onToggle={handleToggle}
        />

        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-600">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 rounded hover:bg-slate-100 disabled:opacity-30"
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 rounded hover:bg-slate-100 disabled:opacity-30"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <DeleteConfirmationModal
        open={!!deleteTarget}
        title="Delete Reward?"
        message={
          <>
            This will permanently delete{" "}
            <span className="font-bold text-red-600">
              {deleteTarget?.title}
            </span>
          </>
        }
        deleting={deleting}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
