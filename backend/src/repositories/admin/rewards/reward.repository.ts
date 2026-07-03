import { FilterQuery } from "mongoose";
import { RewardModel, IReward } from "../../../models/rewards/reward.model";
import {
  CreateRewardType,
  UpdateRewardType,
  RewardQueryType,
} from "../../../dtos/rewards/reward.dto";

export class RewardRepository {
  async create(data: CreateRewardType) {
    return RewardModel.create(data);
  }

  async findById(id: string) {
    return RewardModel.findById(id);
  }

  async findByPromoCode(promoCode: string) {
    return RewardModel.findOne({
      promoCode: promoCode.toUpperCase(),
    });
  }

  async findAll(query: RewardQueryType) {
    const { page, limit, search, isActive } = query;

    const filter: FilterQuery<IReward> = {};

    if (search?.trim()) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          partnerName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          promoCode: {
            $regex: search.toUpperCase(),
            $options: "i",
          },
        },
      ];
    }

    if (typeof isActive === "boolean") {
      filter.isActive = isActive;
    }

    const [rewards, total] = await Promise.all([
      RewardModel.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),

      RewardModel.countDocuments(filter),
    ]);

    return {
      rewards,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findActiveRewards() {
    return RewardModel.find({
      isActive: true,
      expiryDate: { $gte: new Date() },
    }).sort({ createdAt: -1 });
  }

  async update(id: string, data: UpdateRewardType) {
    return RewardModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async toggleStatus(id: string, isActive: boolean) {
    return RewardModel.findByIdAndUpdate(
      id,
      { isActive },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  async delete(id: string) {
    return RewardModel.findByIdAndDelete(id);
  }
}

export const rewardRepository = new RewardRepository();
