import Donor from "../../models/donor.model";
import NGO from "../../models/ngo.model";
import Donation from "../../models/donation.model";
import { RewardModel } from "../../models/rewards/reward.model";
import { FilterQuery } from "mongoose";

// Escape regex special characters
function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const AdminRepository = {
  // DASHBOARD

  getTotalDonors() {
    return Donor.countDocuments({ role: "donor" });
  },

  getTotalAdmins() {
    return Donor.countDocuments({ role: "admin" });
  },

  getTotalNGOs() {
    return NGO.countDocuments();
  },

  getVerifiedNGOs() {
    return NGO.countDocuments({ isVerified: true });
  },

  getPendingNGOs() {
    return NGO.countDocuments({ isVerified: false });
  },

  // Donation Statistics
  getTotalDonations() {
    return Donation.countDocuments();
  },

  getApprovedDonations() {
    return Donation.countDocuments({ adminStatus: "Approved" });
  },

  getRejectedDonations() {
    return Donation.countDocuments({ adminStatus: "Rejected" });
  },

  getPendingDonations() {
    return Donation.countDocuments({ adminStatus: "Pending" });
  },

  getCompletedDonations() {
    return Donation.countDocuments({ status: "Completed" });
  },

  // Reward Statistics
  getActiveRewards() {
    return RewardModel.countDocuments({ isActive: true });
  },

  getInactiveRewards() {
    return RewardModel.countDocuments({ isActive: false });
  },

  // DONORS

  async getAllDonors(
    page: number,
    limit: number,
    search?: string,
  ): Promise<{ data: any[]; total: number }> {
    const skip = (page - 1) * limit;

    const filter: FilterQuery<any> = {
      role: "donor",
    };

    if (search?.trim()) {
      const regex = new RegExp(escapeRegex(search.trim()), "i");

      filter.$or = [
        { fullName: regex },
        { username: regex },
        { email: regex },
        { phoneNumber: regex },
      ];
    }

    const [donors, total] = await Promise.all([
      Donor.find(filter)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Donor.countDocuments(filter),
    ]);

    return {
      data: donors,
      total,
    };
  },

  async getDonorById(id: string) {
    return Donor.findById(id).select("-password");
  },

  async deleteDonor(id: string) {
    return Donor.findByIdAndDelete(id);
  },

  // NGOs

  async getAllNGOs(
    page: number,
    limit: number,
    search?: string,
  ): Promise<{ data: any[]; total: number }> {
    const skip = (page - 1) * limit;

    const filter: FilterQuery<any> = {};

    if (search?.trim()) {
      const regex = new RegExp(escapeRegex(search.trim()), "i");

      filter.$or = [
        { organizationName: regex },
        { contactPerson: regex },
        { email: regex },
        { registrationNumber: regex },
      ];
    }

    const [ngos, total] = await Promise.all([
      NGO.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),

      NGO.countDocuments(filter),
    ]);

    return {
      data: ngos,
      total,
    };
  },

  async getNGOById(id: string) {
    return NGO.findById(id).select("-password");
  },

  async deleteNGO(id: string) {
    return NGO.findByIdAndDelete(id);
  },
};
