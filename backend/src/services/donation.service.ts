import { DonationRepository } from "../repositories/donation.repository";
import { DonorRepository } from "../repositories/donor.repository";
import { CreateDonationType, UpdateDonationType } from "../dtos/donation.dto";

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
  async claimDonation(id: string, ngoId: string, estimatedPickupTime?: Date) {
    const donation = await DonationRepository.findById(id);

    if (!donation) {
      throw new HttpException(404, "Donation not found");
    }

    if (donation.adminStatus !== "Approved") {
      throw new HttpException(400, "Donation is not approved for claiming");
    }

    if (donation.claimStatus !== "Unclaimed") {
      throw new HttpException(400, "Donation has already been claimed");
    }

    const updated = await DonationRepository.claimDonation(
      id,
      ngoId,
      estimatedPickupTime,
    );

    return updated;
  }

  async completeDonation(id: string, pointsEarned?: number) {
    const donation = await DonationRepository.findById(id);

    if (!donation) {
      throw new HttpException(404, "Donation not found");
    }

    if (donation.claimStatus !== "Claimed") {
      throw new HttpException(
        400,
        "Donation must be claimed before completing",
      );
    }

    const updated = await DonationRepository.completeDonation(id, pointsEarned);

    // Award points to donor if pointsEarned is provided
    if (pointsEarned && pointsEarned > 0) {
      await DonorRepository.incrementRewardPoints(
        donation.donorId.toString(),
        pointsEarned,
      );
    }

    return updated;
  }

  async getNgoClaimedDonations(ngoId: string) {
    const donations = await DonationRepository.findNgoClaimedDonations(ngoId);
    return donations;
  }

  async getNgoClaimedDonationsByStatus(ngoId: string, claimStatus: string) {
    const donations = await DonationRepository.findNgoClaimedDonationsByStatus(
      ngoId,
      claimStatus,
    );
    return donations;
  }
}
