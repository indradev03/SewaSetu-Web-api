import { RewardClaimRepository } from "../../repositories/donor/rewardClaim.repository";
import { DonorRepository } from "../../repositories/donor.repository";
import { rewardRepository } from "../../repositories/admin/rewards/reward.repository";
import { ClaimRewardType } from "../../dtos/donor/rewardClaim.dto";
import { HttpException } from "../../exceptions/http-exception";
import mongoose from "mongoose";

class RewardClaimService {
  async claimReward(
    donorId: string,
    data: ClaimRewardType,
  ) {
    // Get the donor
    const donor = await DonorRepository.findById(donorId);
    if (!donor) {
      throw new HttpException(404, "Donor not found");
    }

    // Get the reward
    const reward = await rewardRepository.findById(data.rewardId);
    if (!reward) {
      throw new HttpException(404, "Reward not found");
    }

    // Check if reward is active
    if (!reward.isActive) {
      throw new HttpException(400, "Reward is not active");
    }

    // Check if reward has expired
    if (new Date(reward.expiryDate) < new Date()) {
      throw new HttpException(400, "Reward has expired");
    }

    // Check if donor has enough points
    if (donor.rewardPoints < reward.requiredPoints) {
      throw new HttpException(400, "Insufficient reward points");
    }

    // Check if donor has already claimed this reward
    const existingClaim = await RewardClaimRepository.findByDonorAndReward(donorId, data.rewardId);
    if (existingClaim) {
      throw new HttpException(400, "You have already claimed this reward");
    }

    // Use a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Deduct points from donor
      await DonorRepository.decrementRewardPoints(donorId, reward.requiredPoints);

      // Create reward claim record
      const claim = await RewardClaimRepository.create({
        donorId: donorId as any,
        rewardId: data.rewardId as any,
        pointsUsed: reward.requiredPoints,
        promoCode: reward.promoCode,
        status: "Claimed",
      });

      await session.commitTransaction();
      session.endSession();

      return claim;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async getDonorClaims(donorId: string, status?: string) {
    if (status) {
      return await RewardClaimRepository.findByDonorIdAndStatus(donorId, status);
    }
    return await RewardClaimRepository.findByDonorId(donorId);
  }

  async getClaimById(id: string) {
    const claim = await RewardClaimRepository.findById(id);
    if (!claim) {
      throw new HttpException(404, "Reward claim not found");
    }
    return claim;
  }

  async markClaimAsUsed(id: string) {
    const claim = await RewardClaimRepository.findById(id);
    if (!claim) {
      throw new HttpException(404, "Reward claim not found");
    }

    if (claim.status !== "Claimed") {
      throw new HttpException(400, "Reward claim cannot be marked as used");
    }

    return await RewardClaimRepository.updateStatus(id, "Used");
  }

  async getAllClaims() {
    return await RewardClaimRepository.findAll();
  }
}

export const rewardClaimService = new RewardClaimService();
