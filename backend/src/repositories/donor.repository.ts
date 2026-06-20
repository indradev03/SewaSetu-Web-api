import Donor, { IDonor } from "../models/donor.model";
import { RegisterDonorType, UpdateDonorType } from "../dtos/donor.dto";

export const DonorRepository = {

  // ── Create 
  async create(data: RegisterDonorType & { password: string }): Promise<IDonor> {
    return await Donor.create(data);
  },

  // ── Find ──
  async findById(id: string): Promise<IDonor | null> {
    return await Donor.findById(id).select("-password");
  },

  async findByEmail(email: string): Promise<IDonor | null> {
    return await Donor.findOne({ email });
  },

  async findByUsername(username: string): Promise<IDonor | null> {
    return await Donor.findOne({ username });
  },

  // checks both email and username at once (used during registration)
  async findByEmailOrUsername(email: string, username: string): Promise<IDonor | null> {
    return await Donor.findOne({ $or: [{ email }, { username }] });
  },

  // ── Update 
  async updateById(id: string, data: UpdateDonorType): Promise<IDonor | null> {
    return await Donor.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }          // returns updated document
    ).select("-password");
  },

  // ── Delete 
  async deleteById(id: string): Promise<IDonor | null> {
    return await Donor.findByIdAndDelete(id);
  },

  // ── Exists 
  async emailExists(email: string): Promise<boolean> {
    const doc = await Donor.exists({ email });
    return !!doc;
  },

  async usernameExists(username: string): Promise<boolean> {
    const doc = await Donor.exists({ username });
    return !!doc;
  },
};