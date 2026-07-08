import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { NGORepository } from "../repositories/ngo.repository";
import {
  RegisterNGOType,
  LoginNGOType,
  UpdateNGOType,
  VerifyNGOType,
  ChangePasswordType,
} from "../dtos/ngo.dto";

import { HttpException } from "../exceptions/http-exception";
import { SECRET_KEY, JWT_EXPIRES_IN } from "../config/constant";
import emailService from "./email.service";

export class NGOService {
  // ── REGISTER ──
  async registerNGO(data: RegisterNGOType) {
    // check duplicate email
    const existing = await NGORepository.findByEmail(data.email);

    if (existing) {
      throw new HttpException(400, "Email already exists");
    }

    // check registration number uniqueness
    const regExists = await NGORepository.registrationNumberExists(
      data.registrationNumber,
    );

    if (regExists) {
      throw new HttpException(400, "Registration number already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const ngo = await NGORepository.create({
      ...data,
      password: hashedPassword,
    });

    const { password, ...safeNGO } = ngo.toObject();

    return safeNGO;
  }

  // ── LOGIN ─────
  async loginNGO(data: LoginNGOType) {
    const ngo = await NGORepository.findByEmail(data.email);

    if (!ngo) {
      throw new HttpException(400, "Invalid email or password");
    }

    const isValid = await bcrypt.compare(data.password, ngo.password);

    if (!isValid) {
      throw new HttpException(400, "Invalid email or password");
    }

    if (!ngo.isVerified) {
      throw new HttpException(
        403,
        "Your account has not been verified yet. Please wait for an administrator to review your application.",
      );
    }

    const token = jwt.sign(
      {
        id: ngo._id,
        email: ngo.email,
        role: "ngo",
      },
      SECRET_KEY,
      { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions,
    );

    const { password, ...safeNGO } = ngo.toObject();

    return {
      ngo: safeNGO,
      token,
    };
  }

  // ── GET PROFILE ───
  async getProfile(id: string) {
    const ngo = await NGORepository.findById(id);

    if (!ngo) {
      throw new HttpException(404, "NGO not found");
    }

    return ngo;
  }

  // ── UPDATE PROFILE
  async updateProfile(id: string, data: UpdateNGOType) {
    const ngo = await NGORepository.updateById(id, data);

    if (!ngo) {
      throw new HttpException(404, "NGO not found");
    }

    return ngo;
  }

  // ── GET VERIFIED NGOs ────────────────────────────────
  async getVerifiedNGOs() {
    return await NGORepository.findAllVerified();
  }

  // ── ADMIN VERIFY / UNVERIFY NGO ──────────────────────
  async verifyNGO(id: string, data: VerifyNGOType) {
    const ngo = await NGORepository.setVerified(id, data.isVerified);

    if (!ngo) {
      throw new HttpException(404, "NGO not found");
    }

    // Send email notification when NGO is verified
    if (data.isVerified) {
      try {
        await emailService.sendNGOVerificationEmail(
          ngo.organizationName,
          ngo.email,
        );
      } catch (error) {
        console.error("Failed to send verification email:", error);
        // Don't throw error - verification should still succeed even if email fails
      }
    }

    return ngo;
  }

  // ── DELETE NGO
  async deleteNGO(id: string) {
    const ngo = await NGORepository.deleteById(id);

    if (!ngo) {
      throw new HttpException(404, "NGO not found");
    }

    return ngo;
  }

  // ── REMOVE PROFILE IMAGE
  async removeProfileImage(id: string) {
    const ngo = await NGORepository.updateById(id, { profileImage: "" });

    if (!ngo) {
      throw new HttpException(404, "NGO not found");
    }

    return ngo;
  }

  // ── CHANGE PASSWORD
  async changePassword(id: string, data: ChangePasswordType) {
    const ngo = await NGORepository.findByIdWithPassword(id);

    if (!ngo) {
      throw new HttpException(404, "NGO not found");
    }

    const isValid = await bcrypt.compare(data.currentPassword, ngo.password);

    if (!isValid) {
      throw new HttpException(400, "Current password is incorrect");
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    const updated = await NGORepository.updateById(id, {
      password: hashedPassword,
    } as any);

    if (!updated) {
      throw new HttpException(404, "NGO not found");
    }

    return updated;
  }
}
