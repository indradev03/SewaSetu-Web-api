import { z } from "zod";

// ── Create Donation
export const CreateDonationDTO = z.object({
  category: z.enum(["Food", "Clothes", "Others"]),
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description too long"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unit: z.enum(["Pieces", "Kgs", "Packets", "Liters"]),
  photos: z.array(z.string()).optional().default([]),
  pickupAddress: z.string().min(5, "Pickup address is required"),
});

// ── Update Donation
export const UpdateDonationDTO = z.object({
  category: z.enum(["Food", "Clothes", "Others"]).optional(),
  title: z.string().min(1).max(100).optional(),
  description: z.string().min(10).max(200).optional(),
  quantity: z.number().min(1).optional(),
  unit: z.enum(["Pieces", "Kgs", "Packets", "Liters"]).optional(),
  photos: z.array(z.string()).optional(),
  pickupAddress: z.string().min(5).optional(),
  status: z.enum(["Pending", "Verified", "Completed", "Cancelled"]).optional(),
  estimatedPickupTime: z.string().optional(),
});

// ── Admin Approve/Reject Donation
export const AdminApproveRejectDTO = z.object({
  adminStatus: z.enum(["Approved", "Rejected"]),
  adminRejectionReason: z.string().optional(),
});

// ── NGO Claim Donation
export const NgoClaimDonationDTO = z.object({});

// ── NGO Pickup Donation
export const NgoPickupDonationDTO = z.object({});

// ── NGO Complete Donation
export const NgoCompleteDonationDTO = z.object({});

// ── Types
export type CreateDonationType = z.infer<typeof CreateDonationDTO>;
export type UpdateDonationType = z.infer<typeof UpdateDonationDTO>;
export type AdminApproveRejectType = z.infer<typeof AdminApproveRejectDTO>;
export type NgoClaimDonationType = z.infer<typeof NgoClaimDonationDTO>;
export type NgoPickupDonationType = z.infer<typeof NgoPickupDonationDTO>;
export type NgoCompleteDonationType = z.infer<typeof NgoCompleteDonationDTO>;
