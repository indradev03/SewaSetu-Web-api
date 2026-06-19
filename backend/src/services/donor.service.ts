import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { DonorRepository } from "../repositories/donor.repository";
import {
  RegisterDonorType,
  LoginDonorType,
  UpdateDonorType,
  ChangePasswordType,
} from "../dtos/donor.dto";

import { HttpException } from "../exceptions/http-exception";
import { SECRET_KEY, JWT_EXPIRES_IN } from "../config/constant";

export class DonorService {
  // ── REGISTER
  async registerDonor(data: RegisterDonorType) {
    const existing = await DonorRepository.findByEmailOrUsername(
      data.email,
      data.username,
    );

    if (existing) {
      throw new HttpException(400, "Email or username already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const donor = await DonorRepository.create({
      ...data,
      password: hashedPassword,
      role: "donor",
    } as any);

    const { password, ...safeDonor } = donor.toObject();

    return safeDonor;
  }

  // ── LOGIN
  async loginDonor(data: LoginDonorType) {
    const donor = await DonorRepository.findByEmail(data.email);

    if (!donor) {
      throw new HttpException(400, "Invalid email or password");
    }

    const isValid = await bcrypt.compare(data.password, donor.password);

    if (!isValid) {
      throw new HttpException(400, "Invalid email or password");
    }

    const token = jwt.sign(
      {
        id: donor._id,
        email: donor.email,
        role: donor.role,
      },
      SECRET_KEY,
      { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions,
    );

    const { password, ...safeDonor } = donor.toObject();

    return {
      donor: safeDonor,
      token,
    };
  }

  // ── GET PROFILE
  async getProfile(id: string) {
    const donor = await DonorRepository.findById(id);

    if (!donor) {
      throw new HttpException(404, "Donor not found");
    }

    return donor;
  }

  // ── UPDATE PROFILE
  async updateProfile(id: string, data: UpdateDonorType) {
    const donor = await DonorRepository.updateById(id, data);

    if (!donor) {
      throw new HttpException(404, "Donor not found");
    }

    return donor;
  }

  // ── REMOVE PROFILE IMAGE
  async removeProfileImage(id: string) {
    const donor = await DonorRepository.findById(id);

    if (!donor) {
      throw new HttpException(404, "Donor not found");
    }

    return await DonorRepository.updateById(id, { profileImage: "" } as any);
  }

  // ── DELETE ACCOUNT
  async deleteAccount(id: string) {
    const donor = await DonorRepository.deleteById(id);

    if (!donor) {
      throw new HttpException(404, "Donor not found");
    }

    return donor;
  }

  // Change Password
  async changePassword(id: string, data: ChangePasswordType) {
    const donor = await DonorRepository.findByIdWithPassword(id);

    if (!donor) {
      throw new HttpException(404, "Donor not found");
    }

    const isMatch = await bcrypt.compare(data.currentPassword, donor.password);

    if (!isMatch) {
      throw new HttpException(400, "Current password is incorrect");
    }

    const samePassword = await bcrypt.compare(data.newPassword, donor.password);

    if (samePassword) {
      throw new HttpException(
        400,
        "New password must be different from current password",
      );
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    donor.password = hashedPassword;

    await donor.save();

    return {
      message: "Password changed successfully",
    };
  }
}
