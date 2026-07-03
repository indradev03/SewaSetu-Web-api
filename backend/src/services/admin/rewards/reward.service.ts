import fs from "fs";
import path from "path";

import { rewardRepository } from "../../../repositories/admin/rewards/reward.repository";
import {
  CreateRewardType,
  UpdateRewardType,
  RewardQueryType,
} from "../../../dtos/rewards/reward.dto";
import { HttpException } from "../../../exceptions/http-exception";

class RewardService {
  private deleteImage(filename?: string) {
    if (!filename) return;

    const imagePath = path.join(process.cwd(), "uploads", "rewards", filename);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  async createReward(data: CreateRewardType, file?: Express.Multer.File) {
    const existing = await rewardRepository.findByPromoCode(data.promoCode);

    if (existing) {
      throw new HttpException(409, "Promo code already exists.");
    }

    return rewardRepository.create({
      ...data,
      image: file?.filename,
    });
  }

  async getRewards(query: RewardQueryType) {
    return rewardRepository.findAll(query);
  }

  async getRewardById(id: string) {
    const reward = await rewardRepository.findById(id);

    if (!reward) {
      throw new HttpException(404, "Reward not found.");
    }

    return reward;
  }

  async getActiveRewards() {
    return rewardRepository.findActiveRewards();
  }

  async updateReward(
    id: string,
    data: UpdateRewardType,
    file?: Express.Multer.File,
  ) {
    const reward = await rewardRepository.findById(id);

    if (!reward) {
      throw new HttpException(404, "Reward not found.");
    }

    if (data.promoCode && data.promoCode !== reward.promoCode) {
      const existing = await rewardRepository.findByPromoCode(data.promoCode);

      if (existing && existing._id.toString() !== id) {
        throw new HttpException(409, "Promo code already exists.");
      }
    }

    if (file) {
      this.deleteImage(reward.image);
      data.image = file.filename;
    }

    return rewardRepository.update(id, data);
  }

  async toggleStatus(id: string) {
    const reward = await rewardRepository.findById(id);

    if (!reward) {
      throw new HttpException(404, "Reward not found.");
    }

    return rewardRepository.toggleStatus(id, !reward.isActive);
  }

  async deleteReward(id: string) {
    const reward = await rewardRepository.findById(id);

    if (!reward) {
      throw new HttpException(404, "Reward not found.");
    }

    this.deleteImage(reward.image);

    await rewardRepository.delete(id);

    return {
      message: "Reward deleted successfully.",
    };
  }
}

export const rewardService = new RewardService();
