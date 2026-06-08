import NGO, { INGO } from "../models/ngo.model";
import { RegisterNGOType, UpdateNGOType } from "../dtos/ngo.dto";

export const NGORepository = {

  // ── Create 
  async create(
    data: RegisterNGOType & { password: string }
  ): Promise<INGO> {
    return await NGO.create({
      ...data,
      isVerified: false, // enforce backend rule here
    });
  },

  // ── Find ──
  async findById(id: string): Promise<INGO | null> {
    return await NGO.findById(id).select("-password");
  },

  async findByEmail(email: string): Promise<INGO | null> {
    return await NGO.findOne({ email });
  },

  // ── fetch all NGOs 
  async findAll(): Promise<INGO[]> {
    return await NGO.find().select("-password");
  },

  // ── fetch verified NGOs 
  async findAllVerified(): Promise<INGO[]> {
    return await NGO.find({ isVerified: true }).select("-password");
  },

  // ── Update ─
  async updateById(id: string, data: UpdateNGOType): Promise<INGO | null> {
    return await NGO.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    ).select("-password");
  },

  // ── Admin verify / unverify 
  async setVerified(id: string, isVerified: boolean): Promise<INGO | null> {
    return await NGO.findByIdAndUpdate(
      id,
      { $set: { isVerified } },
      { new: true }
    ).select("-password");
  },

  // ── Delete ─
  async deleteById(id: string): Promise<INGO | null> {
    return await NGO.findByIdAndDelete(id);
  },

  // ── Exists ─
  async emailExists(email: string): Promise<boolean> {
    const doc = await NGO.exists({ email });
    return !!doc;
  },

  async registrationNumberExists(registrationNumber: string): Promise<boolean> {
    const doc = await NGO.exists({ registrationNumber });
    return !!doc;
  },
};