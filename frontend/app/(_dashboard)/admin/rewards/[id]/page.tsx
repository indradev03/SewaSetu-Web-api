"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RewardForm from "../../components/rewards/RewardForm";
import { getRewardById, Reward } from "@/app/lib/api/rewards.api";

export default function EditRewardPage() {
  const params = useParams<{ id: string }>();

  const [reward, setReward] = useState<Reward | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getRewardById(params.id);
        setReward(res.data);
      } catch (err) {
        toast.error("Failed to load reward");
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  return (
    <div className="w-full max-w-8xl mx-auto px-4 py-8">
      <ToastContainer />

      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-emerald-600 font-serif">
          Edit Reward
        </h1>
        <p className="text-gray-500 mt-2">Update the details of this reward.</p>
      </div>

      {loading ? (
        <div className="py-10 text-center text-slate-400 text-sm">
          Loading reward...
        </div>
      ) : reward ? (
        <RewardForm mode="edit" reward={reward} />
      ) : (
        <div className="py-10 text-center text-slate-400 text-sm">
          Reward not found.
        </div>
      )}
    </div>
  );
}
