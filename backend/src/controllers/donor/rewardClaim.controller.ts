import { Request, Response, NextFunction } from "express";
import { rewardClaimService } from "../../services/donor/rewardClaim.service";
import { ClaimRewardDTO } from "../../dtos/donor/rewardClaim.dto";
import { ApiResponseHelper } from "../../utils/api-response";
import { HttpException } from "../../exceptions/http-exception";

class RewardClaimController {
  async claimReward(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = ClaimRewardDTO.safeParse(req.body);

      if (!parsed.success) {
        const message = parsed.error.issues
          .map((e: any) => `${e.path.join(".")} - ${e.message}`)
          .join(", ");

        throw new HttpException(400, message);
      }

      const claim = await rewardClaimService.claimReward(
        req.user!.id,
        parsed.data,
      );

      return ApiResponseHelper.success(
        res,
        claim,
        201,
        "Reward claimed successfully",
      );
    } catch (error: any) {
      next(error);
    }
  }

  async getDonorClaims(req: Request, res: Response, next: NextFunction) {
    try {
      const { status } = req.query;

      const claims = await rewardClaimService.getDonorClaims(
        req.user!.id,
        status as string,
      );

      return ApiResponseHelper.success(
        res,
        claims,
        200,
        "Reward claims fetched successfully",
      );
    } catch (error: any) {
      next(error);
    }
  }

  async getClaimById(req: Request, res: Response, next: NextFunction) {
    try {
      const claim = await rewardClaimService.getClaimById(req.params.id);

      return ApiResponseHelper.success(
        res,
        claim,
        200,
        "Reward claim fetched successfully",
      );
    } catch (error: any) {
      next(error);
    }
  }

  async markClaimAsUsed(req: Request, res: Response, next: NextFunction) {
    try {
      const claim = await rewardClaimService.markClaimAsUsed(req.params.id);

      return ApiResponseHelper.success(
        res,
        claim,
        200,
        "Reward claim marked as used successfully",
      );
    } catch (error: any) {
      next(error);
    }
  }

  async getAllClaims(req: Request, res: Response, next: NextFunction) {
    try {
      const claims = await rewardClaimService.getAllClaims();

      return ApiResponseHelper.success(
        res,
        claims,
        200,
        "All reward claims fetched successfully",
      );
    } catch (error: any) {
      next(error);
    }
  }
}

export const rewardClaimController = new RewardClaimController();
