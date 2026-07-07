import RewardHistory, { IRewardHistory } from "../models/rewardHistory.model";

export const RewardHistoryRepository = {
  // ── Create
  async create(
    data: any
  ): Promise<IRewardHistory> {
    return await RewardHistory.create(data);
  },

  // ── Find ──
  async findById(id: string): Promise<IRewardHistory | null> {
    return await RewardHistory.findById(id)
      .populate("donorId", "username fullName email")
      .populate("donationId", "title")
      .populate("ngoId", "organizationName email");
  },

  async findByDonorId(donorId: string): Promise<IRewardHistory[]> {
    return await RewardHistory.find({ donorId })
      .sort({ createdAt: -1 })
      .populate("donationId", "title")
      .populate("ngoId", "organizationName email");
  },

  async findByDonationId(donationId: string): Promise<IRewardHistory | null> {
    return await RewardHistory.findOne({ donationId })
      .populate("donorId", "username fullName email")
      .populate("ngoId", "organizationName email");
  },

  async findAll(): Promise<IRewardHistory[]> {
    return await RewardHistory.find()
      .sort({ createdAt: -1 })
      .populate("donorId", "username fullName email")
      .populate("donationId", "title")
      .populate("ngoId", "organizationName email");
  },

  // ── Check if reward already granted for donation
  async existsForDonation(donationId: string): Promise<boolean> {
    const doc = await RewardHistory.exists({ donationId });
    return !!doc;
  },
};
