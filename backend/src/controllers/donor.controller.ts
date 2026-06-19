import { Request, Response } from "express";
import { deleteFile } from "../utils/file";

import {
  RegisterDonorDTO,
  LoginDonorDTO,
  UpdateDonorDTO,
  ChangePasswordDTO,
} from "../dtos/donor.dto";

import { DonorService } from "../services/donor.service";
import { HttpException } from "../exceptions/http-exception";
import { ApiResponseHelper } from "../utils/api-response";

const donorService = new DonorService();

export class DonorController {
  // REGISTER DONOR

  async registerDonor(req: Request, res: Response) {
    try {
      const parsed = RegisterDonorDTO.safeParse(req.body);

      if (!parsed.success) {
        const message = parsed.error.issues
          .map((e: any) => `${e.path.join(".")} - ${e.message}`)
          .join(", ");

        throw new HttpException(400, message);
      }

      const donor = await donorService.registerDonor(parsed.data);

      return ApiResponseHelper.success(
        res,
        donor,
        201,
        "Donor registered successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to register donor",
        error.status || 500,
      );
    }
  }

  // LOGIN DONOR

  async loginDonor(req: Request, res: Response) {
    try {
      const parsed = LoginDonorDTO.safeParse(req.body);

      if (!parsed.success) {
        const message = parsed.error.issues
          .map((e: any) => `${e.path.join(".")} - ${e.message}`)
          .join(", ");

        throw new HttpException(400, message);
      }

      const { donor, token } = await donorService.loginDonor(parsed.data);

      return ApiResponseHelper.success(
        res,
        { donor, token },
        200,
        "Login successful",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to login",
        error.status || 500,
      );
    }
  }

  // GET PROFILE

  async getProfile(req: Request, res: Response) {
    try {
      const donor = await donorService.getProfile(req.user!.id);

      return ApiResponseHelper.success(
        res,
        donor,
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
      const parsed = UpdateDonorDTO.safeParse(req.body);

      if (!parsed.success) {
        throw new HttpException(400, "Invalid data");
      }

      // 1. get existing user
      const existingUser = await donorService.getProfile(req.user!.id);

      let profileImage;

      // 2. if new file uploaded
      if (req.file) {
        // 🔥 DELETE OLD FILE FIRST
        if (existingUser?.profileImage) {
          deleteFile(existingUser.profileImage);
        }

        // 3. set new file path
        // profileImage = `${req.protocol}://${req.get(
        //   "host",
        // )}/uploads/profile/donor/${req.file.filename}`;
        profileImage = req.file.filename;
      }

      // 4. update DB
      const updated = await donorService.updateProfile(req.user!.id, {
        ...parsed.data,
        ...(profileImage && { profileImage }),
      });

      return ApiResponseHelper.success(
        res,
        updated,
        200,
        "Profile updated successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(res, error.message, error.status || 500);
    }
  }

  // REMOVE PROFILE IMAGE

  async removeProfileImage(req: Request, res: Response) {
    try {
      // 1. get existing user to grab the old filename
      const existingUser = await donorService.getProfile(req.user!.id);

      // 2. delete the physical file if it exists
      if (existingUser?.profileImage) {
        deleteFile(existingUser.profileImage);
      }

      // 3. clear profileImage in DB
      const updated = await donorService.removeProfileImage(req.user!.id);

      return ApiResponseHelper.success(
        res,
        updated,
        200,
        "Profile image removed successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to remove profile image",
        error.status || 500,
      );
    }
  }

  // DELETE ACCOUNT

  async deleteAccount(req: Request, res: Response) {
    try {
      const donor = await donorService.deleteAccount(req.user!.id);

      return ApiResponseHelper.success(
        res,
        donor,
        200,
        "Account deleted successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to delete account",
        error.status || 500,
      );
    }
  }

  // Change password
  async changePassword(req: Request, res: Response) {
    try {
      const parsed = ChangePasswordDTO.safeParse(req.body);

      if (!parsed.success) {
        const message = parsed.error.issues
          .map((e: any) => e.message)
          .join(", ");

        throw new HttpException(400, message);
      }

      const result = await donorService.changePassword(
        req.user!.id,
        parsed.data,
      );

      return ApiResponseHelper.success(
        res,
        result,
        200,
        "Password changed successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to change password",
        error.status || 500,
      );
    }
  }
}
