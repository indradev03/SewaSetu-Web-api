import { Request, Response } from "express";
import { deleteFile } from "../utils/file";

import {
  CreateDonationDTO,
  UpdateDonationDTO,
  AdminApproveRejectDTO,
  NgoClaimDonationDTO,
  NgoPickupDonationDTO,
  NgoCompleteDonationDTO,
} from "../dtos/donation.dto";

import { DonationService } from "../services/donation.service";
import { HttpException } from "../exceptions/http-exception";
import { ApiResponseHelper } from "../utils/api-response";

const donationService = new DonationService();

export class DonationController {
  // CREATE DONATION
  async createDonation(req: Request, res: Response) {
    try {
      const body = req.body as any;

      // Parse photos array from FormData
      let photos: string[] = [];
      if (body.photos) {
        if (Array.isArray(body.photos)) {
          photos = body.photos;
        } else {
          photos = [body.photos];
        }
      }

      const donationData = {
        category: body.category,
        title: body.title,
        description: body.description,
        quantity: parseInt(body.quantity),
        unit: body.unit,
        pickupAddress: body.pickupAddress,
        photos,
      };

      const parsed = CreateDonationDTO.safeParse(donationData);

      if (!parsed.success) {
        const message = parsed.error.issues
          .map((e: any) => `${e.path.join(".")} - ${e.message}`)
          .join(", ");

        throw new HttpException(400, message);
      }

      // Handle photo uploads if any
      let uploadedPhotos: string[] = parsed.data.photos || [];
      if (req.files && Array.isArray(req.files)) {
        uploadedPhotos = req.files.map((file: any) => file.filename);
        photos = [...parsed.data.photos, ...uploadedPhotos];
      }

      const donation = await donationService.createDonation({
        ...parsed.data,
        photos,
        donorId: req.user!.id,
      });

      return ApiResponseHelper.success(
        res,
        donation,
        201,
        "Donation created successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to create donation",
        error.status || 500,
      );
    }
  }

  // GET DONATION BY ID
  async getDonationById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const donation = await donationService.getDonationById(id);

      if (!donation) {
        throw new HttpException(404, "Donation not found");
      }

      return ApiResponseHelper.success(
        res,
        donation,
        200,
        "Donation fetched successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to fetch donation",
        error.status || 500,
      );
    }
  }

  // GET ALL DONATIONS FOR A DONOR
  async getDonorDonations(req: Request, res: Response) {
    try {
      const donations = await donationService.getDonorDonations(req.user!.id);

      return ApiResponseHelper.success(
        res,
        donations,
        200,
        "Donations fetched successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to fetch donations",
        error.status || 500,
      );
    }
  }

  // GET ALL DONATIONS (with filters - for admin/NGO)
  async getAllDonations(req: Request, res: Response) {
    try {
      const { status, category } = req.query;
      const filters: any = {};
      if (status) filters.status = status;
      if (category) filters.category = category;

      const donations = await donationService.getAllDonations(filters);

      return ApiResponseHelper.success(
        res,
        donations,
        200,
        "All donations fetched successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to fetch donations",
        error.status || 500,
      );
    }
  }

  // UPDATE DONATION
  async updateDonation(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const body = req.body as any;

      // Parse photos array from FormData
      let photos: string[] = [];
      if (body.photos) {
        if (Array.isArray(body.photos)) {
          photos = body.photos;
        } else {
          photos = [body.photos];
        }
      }

      const donationData: any = {};
      if (body.category) donationData.category = body.category;
      if (body.title) donationData.title = body.title;
      if (body.description) donationData.description = body.description;
      if (body.quantity) donationData.quantity = parseInt(body.quantity);
      if (body.unit) donationData.unit = body.unit;
      if (body.pickupAddress) donationData.pickupAddress = body.pickupAddress;
      if (photos.length > 0) donationData.photos = photos;

      const parsed = UpdateDonationDTO.safeParse(donationData);

      if (!parsed.success) {
        const message = parsed.error.issues
          .map((e: any) => `${e.path.join(".")} - ${e.message}`)
          .join(", ");

        throw new HttpException(400, message);
      }

      // Handle photo uploads if any
      let uploadedPhotos: string[] = parsed.data.photos || [];
      if (req.files && Array.isArray(req.files)) {
        uploadedPhotos = req.files.map((file: any) => file.filename);
        photos = [...(parsed.data.photos || []), ...uploadedPhotos];
      }

      const donation = await donationService.updateDonation(id, {
        ...parsed.data,
        ...(photos.length > 0 && { photos }),
      });

      if (!donation) {
        throw new HttpException(404, "Donation not found");
      }

      return ApiResponseHelper.success(
        res,
        donation,
        200,
        "Donation updated successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to update donation",
        error.status || 500,
      );
    }
  }

  // ── ADMIN APPROVAL METHODS

  // Get pending donations for admin approval
  async getPendingApprovals(req: Request, res: Response) {
    try {
      const donations = await donationService.getPendingApprovals();

      return ApiResponseHelper.success(
        res,
        donations,
        200,
        "Pending approvals fetched successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to fetch pending approvals",
        error.status || 500,
      );
    }
  }

  // Admin approve/reject donation
  async approveRejectDonation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const parsed = AdminApproveRejectDTO.safeParse(req.body);

      if (!parsed.success) {
        const message = parsed.error.issues
          .map((e: any) => `${e.path.join(".")} - ${e.message}`)
          .join(", ");

        throw new HttpException(400, message);
      }

      const donation = await donationService.approveRejectDonation(
        id,
        parsed.data.adminStatus,
        parsed.data.adminRejectionReason,
      );

      return ApiResponseHelper.success(
        res,
        donation,
        200,
        `Donation ${parsed.data.adminStatus.toLowerCase()} successfully`,
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to update donation status",
        error.status || 500,
      );
    }
  }

  // ── NGO CLAIM METHODS

  // Get approved donations available for claiming
  async getApprovedDonations(req: Request, res: Response) {
    try {
      const { category, title, pickupAddress, minQuantity, maxQuantity, unit } = req.query;

      const searchParams: any = {};
      if (category) searchParams.category = category;
      if (title) searchParams.title = title as string;
      if (pickupAddress) searchParams.pickupAddress = pickupAddress as string;
      if (minQuantity) searchParams.minQuantity = parseInt(minQuantity as string);
      if (maxQuantity) searchParams.maxQuantity = parseInt(maxQuantity as string);
      if (unit) searchParams.unit = unit;

      const donations = await donationService.getAvailableDonations(
        Object.keys(searchParams).length > 0 ? searchParams : undefined
      );

      return ApiResponseHelper.success(
        res,
        donations,
        200,
        "Available donations fetched successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to fetch available donations",
        error.status || 500,
      );
    }
  }

  // NGO claim a donation
  async claimDonation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const parsed = NgoClaimDonationDTO.safeParse(req.body);

      if (!parsed.success) {
        const message = parsed.error.issues
          .map((e: any) => `${e.path.join(".")} - ${e.message}`)
          .join(", ");

        throw new HttpException(400, message);
      }

      const donation = await donationService.claimDonation(
        id,
        req.user!.id,
      );

      return ApiResponseHelper.success(
        res,
        donation,
        200,
        "Donation claimed successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to claim donation",
        error.status || 500,
      );
    }
  }

  // NGO mark donation as picked up
  async markPickedUp(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const parsed = NgoPickupDonationDTO.safeParse(req.body);

      if (!parsed.success) {
        const message = parsed.error.issues
          .map((e: any) => `${e.path.join(".")} - ${e.message}`)
          .join(", ");

        throw new HttpException(400, message);
      }

      const donation = await donationService.markPickedUp(
        id,
        req.user!.id,
      );

      return ApiResponseHelper.success(
        res,
        donation,
        200,
        "Donation marked as picked up successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to mark donation as picked up",
        error.status || 500,
      );
    }
  }

  // NGO release a claimed donation
  async releaseClaim(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const donation = await donationService.releaseClaim(
        id,
        req.user!.id,
      );

      return ApiResponseHelper.success(
        res,
        donation,
        200,
        "Claim released successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to release claim",
        error.status || 500,
      );
    }
  }

  // NGO delete a completed claimed donation
  async deleteClaimedDonation(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const donation = await donationService.deleteClaimedDonation(
        id,
        req.user!.id,
      );

      return ApiResponseHelper.success(
        res,
        donation,
        200,
        "Donation deleted successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to delete donation",
        error.status || 500,
      );
    }
  }

  // NGO complete a claimed donation
  async completeDonation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const parsed = NgoCompleteDonationDTO.safeParse(req.body);

      if (!parsed.success) {
        const message = parsed.error.issues
          .map((e: any) => `${e.path.join(".")} - ${e.message}`)
          .join(", ");

        throw new HttpException(400, message);
      }

      const donation = await donationService.markCompleted(
        id,
        req.user!.id,
      );

      return ApiResponseHelper.success(
        res,
        donation,
        200,
        "Donation completed successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to complete donation",
        error.status || 500,
      );
    }
  }

  // Get NGO's claimed donations
  async getNgoClaimedDonations(req: Request, res: Response) {
    try {
      const donations = await donationService.getNgoClaimedDonations(req.user!.id);

      return ApiResponseHelper.success(
        res,
        donations,
        200,
        "Claimed donations fetched successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to fetch claimed donations",
        error.status || 500,
      );
    }
  }

  // DELETE DONATION
  async deleteDonation(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Get donation to delete associated photos
      const existingDonation = await donationService.getDonationById(id);
      
      if (!existingDonation) {
        throw new HttpException(404, "Donation not found");
      }

      // Delete associated photo files
      if (existingDonation.photos && existingDonation.photos.length > 0) {
        existingDonation.photos.forEach((photoPath: string) => {
          deleteFile(photoPath);
        });
      }

      const donation = await donationService.deleteDonation(id);

      return ApiResponseHelper.success(
        res,
        donation,
        200,
        "Donation deleted successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to delete donation",
        error.status || 500,
      );
    }
  }

  // DELETE PHOTO FROM DONATION
  async deleteDonationPhoto(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { photoPath }: { photoPath: string } = req.body;

      if (!photoPath) {
        throw new HttpException(400, "Photo path is required");
      }

      // Delete the physical file
      deleteFile(photoPath);

      // Remove photo from donation
      const donation = await donationService.removePhotoFromDonation(id, photoPath);

      if (!donation) {
        throw new HttpException(404, "Donation not found");
      }

      return ApiResponseHelper.success(
        res,
        donation,
        200,
        "Photo deleted successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to delete photo",
        error.status || 500,
      );
    }
  }
}
