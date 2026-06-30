import { Request, Response, NextFunction } from "express";

import { rewardService } from "../../../services/admin/rewards/reward.service";
import {
  CreateRewardDTO,
  UpdateRewardDTO,
  RewardQueryDTO,
} from "../../../dtos/rewards/reward.dto";

class RewardController {
  async createReward(req: Request, res: Response, next: NextFunction) {
    try {
      const data = CreateRewardDTO.parse(req.body);

      const reward = await rewardService.createReward(data, req.file);

      res.status(201).json({
        success: true,
        message: "Reward created successfully.",
        data: reward,
      });
    } catch (error) {
      next(error);
    }
  }

  async getRewards(req: Request, res: Response, next: NextFunction) {
    try {
      const query = RewardQueryDTO.parse(req.query);

      const result = await rewardService.getRewards(query);

      res.status(200).json({
        success: true,
        message: "Rewards fetched successfully.",
        data: result.rewards,
        meta: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          totalPages: result.totalPages,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getRewardById(req: Request, res: Response, next: NextFunction) {
    try {
      const reward = await rewardService.getRewardById(req.params.id);

      res.status(200).json({
        success: true,
        data: reward,
      });
    } catch (error) {
      next(error);
    }
  }

  async getActiveRewards(req: Request, res: Response, next: NextFunction) {
    try {
      const rewards = await rewardService.getActiveRewards();

      res.status(200).json({
        success: true,
        data: rewards,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateReward(req: Request, res: Response, next: NextFunction) {
    try {
      const data = UpdateRewardDTO.parse(req.body);

      const reward = await rewardService.updateReward(
        req.params.id,
        data,
        req.file,
      );

      res.status(200).json({
        success: true,
        message: "Reward updated successfully.",
        data: reward,
      });
    } catch (error) {
      next(error);
    }
  }

  async toggleStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const reward = await rewardService.toggleStatus(req.params.id);

      res.status(200).json({
        success: true,
        message: "Reward status updated successfully.",
        data: reward,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteReward(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await rewardService.deleteReward(req.params.id);

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const rewardController = new RewardController();
