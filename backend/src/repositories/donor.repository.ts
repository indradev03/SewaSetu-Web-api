import Donor, { IDonor } from "../models/donor.model";
import { RegisterDonorType, UpdateDonorType } from "../dtos/donor.dto";

export const DonorRepository = {
  // ── Create
  async create(
    data: RegisterDonorType & { password: string },
  ): Promise<IDonor> {
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
  async findByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<IDonor | null> {
    return await Donor.findOne({ $or: [{ email }, { username }] });
  },

  // ── Update
  async updateById(id: string, data: UpdateDonorType): Promise<IDonor | null> {
    return await Donor.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }, // returns updated document
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

  async findByIdWithPassword(id: string): Promise<IDonor | null> {
    return await Donor.findById(id);
  },

  // ── Reward Points Management
  async incrementRewardPoints(donorId: string, points: number): Promise<IDonor | null> {
    console.log("Incrementing reward points for donor:", donorId, "points:", points);
    
    try {
      // First try to increment directly
      const updated = await Donor.findByIdAndUpdate(
        donorId,
        { $inc: { rewardPoints: points } },
        { new: true },
      ).select("-password");

      if (updated) {
        console.log("Successfully incremented reward points:", updated.rewardPoints);
        return updated;
      }

      // If that fails, try to find and update manually
      console.log("Direct increment failed, trying manual update");
      const donor = await Donor.findById(donorId);
      if (!donor) {
        console.error("Donor not found with ID:", donorId);
        throw new Error("Donor not found");
      }

      console.log("Donor found:", donor._id, "current rewardPoints:", donor.rewardPoints);

      // Initialize rewardPoints if it doesn't exist
      if (donor.rewardPoints === undefined || donor.rewardPoints === null) {
        console.log("Initializing rewardPoints to 0");
        donor.rewardPoints = 0;
      }

      donor.rewardPoints += points;
      await donor.save();

      console.log("Manually updated reward points:", donor.rewardPoints);
      return donor;
    } catch (error) {
      console.error("Error in incrementRewardPoints:", error);
      throw error;
    }
  },

  async decrementRewardPoints(donorId: string, points: number): Promise<IDonor | null> {
    return await Donor.findByIdAndUpdate(
      donorId,
      { $inc: { rewardPoints: -points } },
      { new: true },
    ).select("-password");
  },
};
