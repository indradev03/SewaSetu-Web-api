import { Request, Response } from "express";

import {
  RegisterDonorDTO,
  LoginDonorDTO,
  UpdateDonorDTO,
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
        "Donor registered successfully"
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to register donor",
        error.status || 500
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

      const { donor, token } =
        await donorService.loginDonor(parsed.data);

      return ApiResponseHelper.success(
        res,
        { donor, token },
        200,
        "Login successful"
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to login",
        error.status || 500
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
        "Profile fetched successfully"
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to fetch profile",
        error.status || 500
      );
    }
  }


  // UPDATE PROFILE

  async updateProfile(req: Request, res: Response) {
    try {
      const parsed = UpdateDonorDTO.safeParse(req.body);

      if (!parsed.success) {
        const message = parsed.error.issues
          .map((e: any) => `${e.path.join(".")} - ${e.message}`)
          .join(", ");

        throw new HttpException(400, message);
      }

      const donor = await donorService.updateProfile(
        req.user!.id,
        parsed.data
      );

      return ApiResponseHelper.success(
        res,
        donor,
        200,
        "Profile updated successfully"
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to update profile",
        error.status || 500
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
        "Account deleted successfully"
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to delete account",
        error.status || 500
      );
    }
  }
}