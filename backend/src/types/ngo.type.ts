import { z } from "zod";

// ── Used for REGISTRATION input validation (frontend + backend route) ──
export const NGORegisterSchema = z.object({
  organizationName: z.string().min(1, "Organization name is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  yearEstablished: z.string().min(4, "Year established is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  impactDescription: z.string().min(1, "Impact description is required"),
  address: z.string().optional(),
});

// ── Full NGO type (includes server-managed fields, matches MongoDB document) ──
export const NGOSchema = NGORegisterSchema.extend({
  profileImage: z.string().optional(), // uploaded later from dashboard
  isVerified: z.boolean().default(false), // set by admin/server only
  registrationDocPath: z.string().optional(), // uploaded later from dashboard
  panCardPath: z.string().optional(), // uploaded later from dashboard
});

export type NGORegisterType = z.infer<typeof NGORegisterSchema>; // use in forms
export type NGOType = z.infer<typeof NGOSchema>; // use for full document
