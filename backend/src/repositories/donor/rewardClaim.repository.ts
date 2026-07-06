import mongoose from "mongoose";
import RewardClaim, { IRewardClaim } from "../../models/rewards/rewardClaim.model";
import "../../models/rewards/reward.model";

export const RewardClaimRepository = {
  // ── Create
  async create(
    data: {
      donorId: mongoose.Types.ObjectId;
      rewardId: mongoose.Types.ObjectId;
      pointsUsed: number;
      promoCode: string;
      status: "Claimed" | "Used" | "Expired";
    },
  ): Promise<IRewardClaim> {
    return await RewardClaim.create(data);
  },

  // ── Find
  async findById(id: string): Promise<IRewardClaim | null> {
    return await RewardClaim.findById(id)
      .populate("donorId", "username fullName email")
      .populate("rewardId");
  },

  async findByDonorId(donorId: string): Promise<IRewardClaim[]> {
    return await RewardClaim.find({ donorId })
      .sort({ createdAt: -1 })
      .populate("rewardId");
  },

  async findByDonorIdAndStatus(
    donorId: string,
    status: string,
  ): Promise<IRewardClaim[]> {
    return await RewardClaim.find({ donorId, status })
      .sort({ createdAt: -1 })
      .populate("rewardId");
  },

  async findByDonorAndReward(
    donorId: string,
    rewardId: string,
  ): Promise<IRewardClaim | null> {
    return await RewardClaim.findOne({ donorId, rewardId });
  },

  async findAll(): Promise<IRewardClaim[]> {
    return await RewardClaim.find()
      .sort({ createdAt: -1 })
      .populate("donorId", "username fullName email")
      .populate("rewardId");
  },

  // ── Update
  async updateStatus(
    id: string,
    status: "Claimed" | "Used" | "Expired",
  ): Promise<IRewardClaim | null> {
    return await RewardClaim.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true },
    )
      .populate("donorId", "username fullName email")
      .populate("rewardId");
  },

  // ── Delete
  async deleteById(id: string): Promise<IRewardClaim | null> {
    return await RewardClaim.findByIdAndDelete(id);
  },

  // ── Count
  async countByDonorId(donorId: string): Promise<number> {
    return await RewardClaim.countDocuments({ donorId });
  },
};
