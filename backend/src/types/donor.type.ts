import { z } from "zod";

// ── Used for REGISTRATION input validation (frontend + backend route) ──
export const DonorRegisterSchema = z.object({
  username:    z.string().min(1, "Username is required"),
  fullName:    z.string().min(1, "Full name is required"),
  email:       z.string().email("Invalid email"),
  password:    z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z.string().min(7, "Phone number is required"),
  gender:      z.enum(["male", "female", "other"]).optional(),
  address:     z.string().optional(),
});

// ── Full Donor type (includes server-managed fields, matches MongoDB document) ──
export const DonorSchema = DonorRegisterSchema.extend({
  profilePicture: z.string().optional(),                    // uploaded later from dashboard
  role:           z.enum(["donor", "admin"]).default("donor"), // ngo has its own model
});

export type DonorRegisterType = z.infer<typeof DonorRegisterSchema>; // use in forms
export type DonorType = z.infer<typeof DonorSchema>;                 // use for full document