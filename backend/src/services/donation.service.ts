import { DonationRepository } from "../repositories/donation.repository";
import { DonorRepository } from "../repositories/donor.repository";
import { RewardHistoryRepository } from "../repositories/rewardHistory.repository";
import { NGORepository } from "../repositories/ngo.repository";
import { CreateDonationType, UpdateDonationType } from "../dtos/donation.dto";
import mongoose from "mongoose";
import Donation from "../models/donation.model";

import { HttpException } from "../exceptions/http-exception";

export class DonationService {
  // ── CREATE DONATION
  async createDonation(data: CreateDonationType & { donorId: string }) {
    const donation = await DonationRepository.create(data);
    return donation;
  }

  // ── GET DONATION BY ID
  async getDonationById(id: string) {
    const donation = await DonationRepository.findById(id);

    if (!donation) {
      throw new HttpException(404, "Donation not found");
    }

    return donation;
  }

  // ── GET DONOR DONATIONS
  async getDonorDonations(donorId: string) {
    const donations = await DonationRepository.findByDonorId(donorId);
    return donations;
  }

  // ── GET ALL DONATIONS
  async getAllDonations(filters?: { status?: string; category?: string }) {
    const donations = await DonationRepository.findAll(filters);
    return donations;
  }

  // ── UPDATE DONATION
  async updateDonation(id: string, data: UpdateDonationType) {
    const donation = await DonationRepository.updateById(id, data);

    if (!donation) {
      throw new HttpException(404, "Donation not found");
    }

    return donation;
  }

  // ── UPDATE DONATION STATUS
  async updateDonationStatus(
    id: string,
    status: string,
    estimatedPickupTime?: Date,
    pointsEarned?: number,
  ) {
    const donation = await DonationRepository.updateStatus(
      id,
      status,
      estimatedPickupTime,
      pointsEarned,
    );

    if (!donation) {
      throw new HttpException(404, "Donation not found");
    }

    return donation;
  }

  // ── DELETE DONATION
  async deleteDonation(id: string) {
    const donation = await DonationRepository.deleteById(id);

    if (!donation) {
      throw new HttpException(404, "Donation not found");
    }

    return donation;
  }

  // ── REMOVE PHOTO FROM DONATION
  async removePhotoFromDonation(id: string, photoPath: string) {
    const donation = await DonationRepository.findById(id);

    if (!donation) {
      throw new HttpException(404, "Donation not found");
    }

    const updatedPhotos = donation.photos.filter(
      (photo) => photo !== photoPath,
    );

    const updated = await DonationRepository.updateById(id, {
      photos: updatedPhotos,
    } as any);

    return updated;
  }

  // ── ADMIN APPROVAL METHODS
  async approveRejectDonation(
    id: string,
    adminStatus: string,
    adminRejectionReason?: string,
  ) {
    const donation = await DonationRepository.findById(id);

    if (!donation) {
      throw new HttpException(404, "Donation not found");
    }

    if (donation.adminStatus !== "Pending") {
      throw new HttpException(400, "Donation has already been reviewed");
    }

    const updated = await DonationRepository.updateAdminStatus(
      id,
      adminStatus,
      adminRejectionReason,
    );

    return updated;
  }

  async getPendingApprovals() {
    const donations = await DonationRepository.findPendingApprovals();
    return donations;
  }

  async getApprovedDonations() {
    const donations = await DonationRepository.findApprovedDonations();
    return donations;
  }

  // ── NGO CLAIM METHODS
  async getAvailableDonations() {
    const donations = await DonationRepository.findAvailableDonations();
    return donations;
  }

  async claimDonation(id: string, ngoId: string) {
    const donation = await DonationRepository.findById(id);

    if (!donation) {
      throw new HttpException(404, "Donation not found");
    }

    if (donation.adminStatus !== "Approved") {
      throw new HttpException(400, "Donation is not approved for claiming");
    }

    // Check if donation is available (either status is "Available" or status doesn't exist)
    if (donation.status && donation.status !== "Available") {
      throw new HttpException(400, "Donation has already been claimed");
    }

    if (donation.rewardGranted) {
      throw new HttpException(400, "Reward already granted for this donation");
    }

    // Generate random reward points between 10 and 100
    const rewardPoints = Math.floor(Math.random() * 91) + 10;
    console.log("Generated random reward points:", rewardPoints);

    // Award points to donor - try multiple approaches
    let pointsAwarded = false;
    try {
      await DonorRepository.incrementRewardPoints(
        donation.donorId.toString(),
        rewardPoints,
      );
      pointsAwarded = true;
      console.log("Successfully awarded reward points to donor");
    } catch (error) {
      console.error("Failed to increment reward points with repository:", error);
      
      // Fallback: try direct database update
      try {
        const Donor = require("../models/donor.model").default;
        const donor = await Donor.findById(donation.donorId);
        if (donor) {
          if (!donor.rewardPoints) donor.rewardPoints = 0;
          donor.rewardPoints += rewardPoints;
          await donor.save();
          pointsAwarded = true;
          console.log("Successfully awarded points using fallback method");
        }
      } catch (fallbackError) {
        console.error("Fallback method also failed:", fallbackError);
      }
    }

    if (!pointsAwarded) {
      console.error("All methods to award points failed, proceeding with claim without points");
    }

    // Create reward history record only if points were awarded
    if (pointsAwarded) {
      try {
        await RewardHistoryRepository.create({
          donorId: donation.donorId,
          donationId: donation._id,
          ngoId: new mongoose.Types.ObjectId(ngoId),
          pointsAwarded: rewardPoints,
          reason: "Donation Claimed by NGO",
        });
        console.log("Successfully created reward history");
      } catch (error) {
        console.error("Failed to create reward history:", error);
      }
    }

    // Claim the donation with all updates in one operation
    try {
      const updated = await Donation.findByIdAndUpdate(
        id,
        {
          $set: {
            claimedByNgoId: new mongoose.Types.ObjectId(ngoId),
            status: "Claimed",
            claimedAt: new Date(),
            rewardPointsAwarded: pointsAwarded ? rewardPoints : 0,
            rewardGranted: pointsAwarded,
          },
        },
        { new: true },
      )
        .populate("donorId", "username fullName email profileImage")
        .populate("claimedByNgoId", "organizationName email contactPerson");

      console.log("Successfully claimed donation, points awarded:", pointsAwarded);
      return updated;
    } catch (error) {
      console.error("Failed to claim donation:", error);
      throw new HttpException(500, "Failed to claim donation");
    }
  }

  async markPickedUp(id: string, ngoId: string) {
    const donation = await DonationRepository.findById(id);

    if (!donation) {
      throw new HttpException(404, "Donation not found");
    }

    if (donation.status !== "Claimed") {
      throw new HttpException(400, "Donation must be claimed before marking as picked up");
    }

    if (donation.claimedByNgoId?.toString() !== ngoId) {
      throw new HttpException(403, "You can only mark your own claimed donations as picked up");
    }

    const updated = await DonationRepository.markPickedUp(id);
    return updated;
  }

  async releaseClaim(id: string, ngoId: string) {
    const donation = await DonationRepository.findById(id);

    if (!donation) {
      throw new HttpException(404, "Donation not found");
    }

    if (donation.claimedByNgoId?.toString() !== ngoId) {
      throw new HttpException(403, "You can only release your own claimed donations");
    }

    if (donation.status === "Completed") {
      throw new HttpException(400, "Cannot release a completed donation");
    }

    const updated = await DonationRepository.releaseClaim(id, ngoId);
    return updated;
  }

  async deleteClaimedDonation(id: string, ngoId: string) {
    const donation = await DonationRepository.findById(id);

    if (!donation) {
      throw new HttpException(404, "Donation not found");
    }

    if (donation.claimedByNgoId?.toString() !== ngoId) {
      throw new HttpException(403, "You can only delete your own claimed donations");
    }

    if (donation.status !== "Completed") {
      throw new HttpException(400, "You can only delete completed donations");
    }

    const deleted = await DonationRepository.delete(id);
    return deleted;
  }

  async markCompleted(id: string, ngoId: string) {
    const donation = await DonationRepository.findById(id);

    if (!donation) {
      throw new HttpException(404, "Donation not found");
    }

    if (donation.status !== "PickedUp") {
      throw new HttpException(400, "Donation must be picked up before marking as completed");
    }

    if (donation.claimedByNgoId?.toString() !== ngoId) {
      throw new HttpException(403, "You can only mark your own claimed donations as completed");
    }

    const updated = await DonationRepository.markCompleted(
      id,
      donation.rewardPointsAwarded || 0,
    );
    return updated;
  }

  async getNgoClaimedDonations(ngoId: string) {
    const donations = await DonationRepository.findClaimedByNgo(ngoId);
    return donations;
  }

  async getDonationsByStatus(status: string) {
    const donations = await DonationRepository.findByStatus(status);
    return donations;
  }
}
