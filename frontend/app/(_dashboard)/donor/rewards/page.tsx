"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Gift, Clock, CheckCircle2, XCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getDonorRewards, Reward } from "@/app/lib/api/rewards.api";
import { getImageUrl } from "@/app/lib/utils/getImageUrl";
import axiosInstance from "@/app/lib/api/axios-instance";

const formatDate = (date?: string) => {
  if (!date) return "-";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(d);
};

const formatDiscount = (reward: Reward) => {
  switch (reward.discountType) {
    case "percentage":
      return `${reward.discountValue}%`;
    case "fixed":
      return `Rs. ${reward.discountValue}`;
    case "freebie":
      return "Freebie";
    default:
      return "-";
  }
};

export default function DonorRewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [claiming, setClaiming] = useState<string | null>(null);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [claimedRewardIds, setClaimedRewardIds] = useState<Set<string>>(
    new Set(),
  );
  const [userClaims, setUserClaims] = useState<any[]>([]);

  const fetchRewards = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = {};

      if (filter === "active") {
        params.isActive = true;
      } else if (filter === "inactive") {
        params.isActive = false;
      }

      const res = await getDonorRewards(params);
      setRewards(res.data || []);
    } catch {
      toast.error("Failed to load rewards");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  const fetchUserPoints = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/donor/profile");
      setUserPoints(res.data.data.rewardPoints || 0);
    } catch {
      console.error("Failed to fetch user points");
    }
  }, []);

  const fetchUserClaims = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/donor/reward-claims");
      const claims = res.data.data || [];
      console.log("Fetched claims:", claims);
      const claimedIds = new Set<string>(
        claims
          .filter((claim: any) => claim.rewardId)
          .map((claim: any) => claim.rewardId._id || claim.rewardId),
      );
      console.log("Claimed IDs:", claimedIds);
      setClaimedRewardIds(claimedIds);
      setUserClaims(claims);
    } catch (error: any) {
      console.error("Failed to fetch user claims:", error?.response?.data || error?.message);
    }
  }, []);

  useEffect(() => {
    fetchRewards();
    fetchUserPoints();
    fetchUserClaims();
  }, [fetchRewards, fetchUserPoints, fetchUserClaims]);

  const handleClaim = async (rewardId: string, requiredPoints: number) => {
    if (userPoints < requiredPoints) {
      toast.error(`Insufficient points. You need ${requiredPoints} points.`);
      return;
    }

    setClaiming(rewardId);
    try {
      const res = await axiosInstance.post("/donor/reward-claims", {
        rewardId,
      });

      if (res.data.success) {
        toast.success("Reward claimed successfully!");
        await fetchRewards();
        await fetchUserPoints();
        await fetchUserClaims();
      } else {
        toast.error(res.data.message || "Failed to claim reward");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to claim reward");
    } finally {
      setClaiming(null);
    }
  };

  const canClaim = (reward: Reward) => {
    return (
      reward.isActive &&
      !claimedRewardIds.has(reward._id) &&
      userPoints >= reward.requiredPoints
    );
  };

  const getFilteredRewards = () => {
    if (filter === "myclaims") {
      return rewards.filter((reward) => claimedRewardIds.has(reward._id));
    }
    return rewards;
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

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-emerald-600 font-serif">
            Rewards
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Claim rewards using your donation points
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 px-6 py-3 rounded-xl">
          <p className="text-sm font-semibold text-emerald-700">
            Your Points: {userPoints}
          </p>
        </div>
      </div>

      {/* Improved Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-6 ">
        <div className="flex flex-wrap gap-2 ">
          {[
            { label: "All Rewards", value: "all" },
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
            { label: "My Claims", value: "myclaims" },
          ].map((item) => {
            const isActive = filter === item.value;

            return (
              <button
                key={item.value}
                onClick={() => setFilter(item.value)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-linear-to-r  from-emerald-600 to-green-600 hover:shadow-lg hover:scale-[1.02] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rewards Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-slate-500">Loading rewards...</p>
        </div>
      ) : !rewards.length ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <Gift size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="font-medium text-slate-500">No rewards available</p>
          <p className="text-sm text-slate-400 mt-1">
            Check back later for new rewards
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredRewards().map((reward) => {
            const imageUrl = getImageUrl("rewards", reward.image);
            const isClaimable = canClaim(reward);
            const isClaimedByCurrentUser = claimedRewardIds.has(reward._id);

            return (
              <div
                key={reward._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={reward.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <Gift size={48} className="text-slate-300" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
                      {reward.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2 mt-1">
                      {reward.description}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Partner:</span>
                      <span className="font-semibold text-slate-700">
                        {reward.partnerName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Promo Code:</span>
                      <span className="font-mono font-semibold text-slate-700">
                        {reward.promoCode}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Discount:</span>
                      <span className="font-semibold text-slate-700">
                        {formatDiscount(reward)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Expiry:</span>
                      <span className="text-slate-700">
                        {formatDate(reward.expiryDate)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Points:</span>
                      <span className="font-semibold text-emerald-600">
                        {reward.requiredPoints} pts
                      </span>
                    </div>
                  </div>

                  {/* Claimed Status Badge */}
                  {isClaimedByCurrentUser && (
                    <div className="flex items-center gap-3 rounded-xl border border-purple-200 bg-linear-to-r from-purple-50 to-violet-50 p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                        <CheckCircle2 className="h-5 w-5 text-purple-600" />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-purple-700">
                          Reward Claimed
                        </span>
                        <span className="text-xs text-gray-500">
                          This reward has been successfully added to your
                          account.
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Claim Button */}
                  {!isClaimedByCurrentUser && (
                    <>
                      {isClaimable ? (
                        <button
                          onClick={() =>
                            handleClaim(reward._id, reward.requiredPoints)
                          }
                          disabled={claiming === reward._id}
                          className="w-full bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {claiming === reward._id ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Claiming...
                            </>
                          ) : (
                            <>
                              <Gift size={16} />
                              Claim Reward
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          disabled
                          className="w-full bg-slate-100 text-slate-400 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {!reward.isActive ? (
                            <>
                              <XCircle size={16} />
                              Inactive
                            </>
                          ) : (
                            <>
                              <XCircle size={16} />
                              Insufficient Points
                            </>
                          )}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
