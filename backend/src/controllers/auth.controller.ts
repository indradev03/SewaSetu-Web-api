import { Request, Response, NextFunction } from "express";
import { DonorService } from "../services/donor.service";
import { NGOService } from "../services/ngo.service";
import {
  ForgotPasswordDTO,
  VerifyResetCodeDTO,
  ResetPasswordDTO,
} from "../dtos/donor.dto";

const donorService = new DonorService();
const ngoService = new NGOService();

export class AuthController {
  // ── FORGOT PASSWORD (Donor)
  async forgotPasswordDonor(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = ForgotPasswordDTO.parse(req.body);
      const result = await donorService.forgotPassword(validatedData);
      res.status(200).json(result);
    } catch (error: any) {
      next(error);
    }
  }

  // ── VERIFY RESET CODE (Donor)
  async verifyResetCodeDonor(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = VerifyResetCodeDTO.parse(req.body);
      const result = await donorService.verifyResetCode(validatedData);
      res.status(200).json(result);
    } catch (error: any) {
      next(error);
    }
  }

  // ── RESET PASSWORD (Donor)
  async resetPasswordDonor(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = ResetPasswordDTO.parse(req.body);
      const result = await donorService.resetPassword(validatedData);
      res.status(200).json(result);
    } catch (error: any) {
      next(error);
    }
  }

  // ── FORGOT PASSWORD (NGO)
  async forgotPasswordNGO(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = ForgotPasswordDTO.parse(req.body);
      const result = await ngoService.forgotPassword(validatedData);
      res.status(200).json(result);
    } catch (error: any) {
      next(error);
    }
  }

  // ── VERIFY RESET CODE (NGO)
  async verifyResetCodeNGO(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = VerifyResetCodeDTO.parse(req.body);
      const result = await ngoService.verifyResetCode(validatedData);
      res.status(200).json(result);
    } catch (error: any) {
      next(error);
    }
  }

  // ── RESET PASSWORD (NGO)
  async resetPasswordNGO(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = ResetPasswordDTO.parse(req.body);
      const result = await ngoService.resetPassword(validatedData);
      res.status(200).json(result);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new AuthController();
