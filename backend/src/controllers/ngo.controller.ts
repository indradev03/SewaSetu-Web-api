import { Request, Response } from "express";

import {
  RegisterNGODTO,
  LoginNGODTO,
  UpdateNGODTO,
  VerifyNGODTO,
} from "../dtos/ngo.dto";

import { NGOService } from "../services/ngo.service";
import { HttpException } from "../exceptions/http-exception";
import { ApiResponseHelper } from "../utils/api-response";
import { deleteFile } from "../utils/file";

const ngoService = new NGOService();

export class NGOController {
  // REGISTER NGO

  async registerNGO(req: Request, res: Response) {
    try {
      const parsed = RegisterNGODTO.safeParse(req.body);

      if (!parsed.success) {
        const message = parsed.error.issues
          .map((e: any) => `${e.path.join(".")} - ${e.message}`)
          .join(", ");

        throw new HttpException(400, message);
      }

      const ngo = await ngoService.registerNGO(parsed.data);

      return ApiResponseHelper.success(
        res,
        ngo,
        201,
        "NGO registered successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to register NGO",
        error.status || 500,
      );
    }
  }

  // LOGIN NGO

  async loginNGO(req: Request, res: Response) {
    try {
      const parsed = LoginNGODTO.safeParse(req.body);

      if (!parsed.success) {
        const message = parsed.error.issues
          .map((e: any) => `${e.path.join(".")} - ${e.message}`)
          .join(", ");

        throw new HttpException(400, message);
      }

      const { ngo, token } = await ngoService.loginNGO(parsed.data);

      return ApiResponseHelper.success(
        res,
        { ngo, token },
        200,
        "Login successful",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to login NGO",
        error.status || 500,
      );
    }
  }

  // GET PROFILE

  async getProfile(req: Request, res: Response) {
    try {
      const ngo = await ngoService.getProfile(req.user!.id);

      return ApiResponseHelper.success(
        res,
        ngo,
        200,
        "Profile fetched successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to fetch profile",
        error.status || 500,
      );
    }
  }

  // UPDATE PROFILE

  async updateProfile(req: Request, res: Response) {
    try {
      const parsed = UpdateNGODTO.safeParse(req.body);

      if (!parsed.success) {
        const message = parsed.error.issues
          .map((e: any) => `${e.path.join(".")} - ${e.message}`)
          .join(", ");

        throw new HttpException(400, message);
      }

      // 1. get existing NGO
      const existingNGO = await ngoService.getProfile(req.user!.id);

      let profileImage;

      // 2. handle new image upload
      if (req.file) {
        // 🔥 delete old image first
        if (existingNGO?.profileImage) {
          deleteFile(existingNGO.profileImage);
        }

        // 3. set new image path
        profileImage = `${req.protocol}://${req.get(
          "host",
        )}/uploads/profile/ngo/${req.file.filename}`;
      }

      // 4. update DB
      const ngo = await ngoService.updateProfile(req.user!.id, {
        ...parsed.data,
        ...(profileImage && { profileImage }),
      });

      return ApiResponseHelper.success(
        res,
        ngo,
        200,
        "Profile updated successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to update profile",
        error.status || 500,
      );
    }
  }

  // GET VERIFIED NGOs

  async getVerifiedNGOs(req: Request, res: Response) {
    try {
      const ngos = await ngoService.getVerifiedNGOs();

      return ApiResponseHelper.success(
        res,
        ngos,
        200,
        "Verified NGOs fetched successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to fetch NGOs",
        error.status || 500,
      );
    }
  }

  // ADMIN VERIFY NGO

  async verifyNGO(req: Request, res: Response) {
    try {
      const parsed = VerifyNGODTO.safeParse(req.body);

      if (!parsed.success) {
        const message = parsed.error.issues
          .map((e: any) => `${e.path.join(".")} - ${e.message}`)
          .join(", ");

        throw new HttpException(400, message);
      }

      const ngo = await ngoService.verifyNGO(req.params.id, parsed.data);

      return ApiResponseHelper.success(
        res,
        ngo,
        200,
        "NGO verification updated",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to verify NGO",
        error.status || 500,
      );
    }
  }

  // DELETE NGO

  async deleteNGO(req: Request, res: Response) {
    try {
      const ngo = await ngoService.deleteNGO(req.params.id);

      return ApiResponseHelper.success(
        res,
        ngo,
        200,
        "NGO deleted successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to delete NGO",
        error.status || 500,
      );
    }
  }
}
