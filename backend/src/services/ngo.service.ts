import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { NGORepository } from "../repositories/ngo.repository";
import {
  RegisterNGOType,
  LoginNGOType,
  UpdateNGOType,
  VerifyNGOType,
} from "../dtos/ngo.dto";

import { HttpException } from "../exceptions/http-exception";
import { SECRET_KEY, JWT_EXPIRES_IN } from "../config/constant";

export class NGOService {
  // ── REGISTER ──
  async registerNGO(data: RegisterNGOType) {
    // check duplicate email
    const existing = await NGORepository.findByEmail(data.email);

    if (existing) {
      throw new HttpException(400, "Email already exists");
    }

    // check registration number uniqueness
    const regExists =
      await NGORepository.registrationNumberExists(
        data.registrationNumber
      );

    if (regExists) {
      throw new HttpException(
        400,
        "Registration number already exists"
      );
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

    const token = jwt.sign(
      {
        id: ngo._id,
        email: ngo.email,
        role: "ngo",
      },
      SECRET_KEY,
      { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
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
}