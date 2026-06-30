"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Search, Plus } from "lucide-react";

import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";

import RewardTable from "../components/rewards/RewardTable";
import {
  deleteReward,
  getAllRewards,
  Reward,
  toggleRewardStatus,
} from "@/app/lib/api/rewards.api";

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

  // ── Fetch Rewards ─────────────────────────────
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
      } catch (err) {
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

  // ── Search ─────────────────────────────
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchRewards(1, search);
  };

  // ── Delete ─────────────────────────────
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

  // ── Toggle Status ─────────────────────────────
  const handleToggle = async (id: string) => {
    const res = await toggleRewardStatus(id);

    if (res.success) {
      fetchRewards(page, search);
    } else {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:px-6 py-8 space-y-6">
      <ToastContainer />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Rewards</h1>
          <p className="text-xs text-slate-400 mt-1">{total} total rewards</p>
        </div>

        <button
          onClick={() => router.push("/admin/rewards/create")}
          className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-600"
        >
          <Plus size={16} />
          Create Reward
        </button>
      </div>

      {/* SEARCH */}
      <form onSubmit={handleSearch} className="relative w-full sm:w-72">
        <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search rewards..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm"
        />
      </form>

      {/* TABLE */}
      <RewardTable
        rewards={rewards}
        loading={loading}
        onEdit={(id) => router.push(`/admin/rewards/${id}`)}
        onDelete={(reward) => setDeleteTarget(reward)}
        onToggle={handleToggle}
      />

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="text-sm disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-xs text-slate-400">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* DELETE MODAL */}
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
