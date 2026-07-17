import { Router } from "express";
import { DonationController } from "../controllers/donation.controller";
import {
  authorizedMiddleware,
  authorizeRoles,
} from "../middleware/auth.middleware";
import { uploadDonationPhotos } from "../middleware/upload.middleware";

const router = Router();
const donationController = new DonationController();

/**
 * PROTECTED ROUTES (DONOR ONLY)
 */

// Create donation
router.post(
  "/",
  authorizedMiddleware,
  authorizeRoles("donor"),
  uploadDonationPhotos.array("photos", 5),
  donationController.createDonation.bind(donationController),
);

// Get all donations for the logged-in donor
router.get(
  "/my-donations",
  authorizedMiddleware,
  authorizeRoles("donor"),
  donationController.getDonorDonations.bind(donationController),
);

// Get donor statistics
router.get(
  "/statistics",
  authorizedMiddleware,
  authorizeRoles("donor"),
  donationController.getDonorStatistics.bind(donationController),
);

// Get specific donation by ID
router.get(
  "/:id",
  authorizedMiddleware,
  authorizeRoles("donor"),
  donationController.getDonationById.bind(donationController),
);

// Update donation
router.put(
  "/:id",
  authorizedMiddleware,
  authorizeRoles("donor"),
  uploadDonationPhotos.array("photos", 5),
  donationController.updateDonation.bind(donationController),
);

// Delete donation
router.delete(
  "/:id",
  authorizedMiddleware,
  authorizeRoles("donor"),
  donationController.deleteDonation.bind(donationController),
);

// Delete photo from donation
router.delete(
  "/:id/photos",
  authorizedMiddleware,
  authorizeRoles("donor"),
  donationController.deleteDonationPhoto.bind(donationController),
);

/**
 * ADMIN ROUTES (for managing donations)
 */

// Get all donations for admin
router.get(
  "/admin/all",
  authorizedMiddleware,
  authorizeRoles("admin"),
  donationController.getAllDonations.bind(donationController),
);

// Get pending donations for approval
router.get(
  "/admin/pending",
  authorizedMiddleware,
  authorizeRoles("admin"),
  donationController.getPendingApprovals.bind(donationController),
);

// Admin approve/reject donation
router.put(
  "/admin/:id/approve",
  authorizedMiddleware,
  authorizeRoles("admin"),
  donationController.approveRejectDonation.bind(donationController),
);

// Admin delete donation
router.delete(
  "/admin/:id",
  authorizedMiddleware,
  authorizeRoles("admin"),
  donationController.deleteDonation.bind(donationController),
);

/**
 * NGO ROUTES (for claiming donations)
 */

// Get approved donations available for claiming
router.get(
  "/ngo/available",
  authorizedMiddleware,
  authorizeRoles("ngo"),
  donationController.getApprovedDonations.bind(donationController),
);

// NGO claim a donation
router.post(
  "/ngo/:id/claim",
  authorizedMiddleware,
  authorizeRoles("ngo"),
  donationController.claimDonation.bind(donationController),
);

// NGO mark donation as picked up
router.patch(
  "/ngo/:id/pickup",
  authorizedMiddleware,
  authorizeRoles("ngo"),
  donationController.markPickedUp.bind(donationController),
);

// NGO release a claimed donation
router.patch(
  "/ngo/:id/release",
  authorizedMiddleware,
  authorizeRoles("ngo"),
  donationController.releaseClaim.bind(donationController),
);

// NGO delete a completed claimed donation
router.delete(
  "/ngo/:id",
  authorizedMiddleware,
  authorizeRoles("ngo"),
  donationController.deleteClaimedDonation.bind(donationController),
);

// NGO complete a claimed donation
router.patch(
  "/ngo/:id/complete",
  authorizedMiddleware,
  authorizeRoles("ngo"),
  donationController.completeDonation.bind(donationController),
);

// Get NGO's claimed donations
router.get(
  "/ngo/claimed",
  authorizedMiddleware,
  authorizeRoles("ngo"),
  donationController.getNgoClaimedDonations.bind(donationController),
);

// Get NGO statistics
router.get(
  "/ngo/statistics",
  authorizedMiddleware,
  authorizeRoles("ngo"),
  donationController.getNgoStatistics.bind(donationController),
);

export default router;
