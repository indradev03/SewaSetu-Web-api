import { z } from "zod";

// ── Register
export const RegisterDonorDTO = z.object({
  username: z.string().min(1, "Username is required"),
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z.string().min(7, "Phone number is required"),
  gender: z.enum(["male", "female", "other"]).optional(),
  address: z.string().optional(),
});

// ── Login
export const LoginDonorDTO = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

// ── Update Profile
export const UpdateDonorDTO = z.object({
  fullName: z.string().min(1).optional(),
  phoneNumber: z.string().min(7).optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  address: z.string().optional(),
});

// ── Types
export type RegisterDonorType = z.infer<typeof RegisterDonorDTO>;
export type LoginDonorType = z.infer<typeof LoginDonorDTO>;
export type UpdateDonorType = z.infer<typeof UpdateDonorDTO>;
