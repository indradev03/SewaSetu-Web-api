import { z } from "zod";

// ── Register
export const RegisterNGODTO = z.object({
  organizationName: z.string().min(1, "Organization name is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  yearEstablished: z.string().min(4, "Year established is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  impactDescription: z.string().min(1, "Impact description is required"),
  address: z.string().optional(),
  registrationDocPath: z.string().optional(),
  panCardPath: z.string().optional(),
});

// ── Login ───
export const LoginNGODTO = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

// ── Update Profile (all optional, only send what changed) ─
export const UpdateNGODTO = z.object({
  organizationName: z.string().min(1).optional(),
  contactPerson: z.string().min(1).optional(),
  address: z.string().optional(),
  impactDescription: z.string().min(1).optional(),
  profileImage: z.string().optional(),
  // docs uploaded later from dashboard
  registrationDocPath: z.string().optional(),
  panCardPath: z.string().optional(),
});

// ── Admin only
export const VerifyNGODTO = z.object({
  isVerified: z.boolean(),
});

export const ChangePasswordDTO = z
  .object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ── Forgot Password
export const ForgotPasswordDTO = z.object({
  email: z.string().email("Invalid email"),
});

export const VerifyResetCodeDTO = z.object({
  email: z.string().email("Invalid email"),
  code: z.string().min(6, "Code must be 6 characters"),
});

export const ResetPasswordDTO = z
  .object({
    email: z.string().email("Invalid email"),
    code: z.string().min(6, "Code must be 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ── Types ───
export type RegisterNGOType = z.infer<typeof RegisterNGODTO>;
export type LoginNGOType = z.infer<typeof LoginNGODTO>;
export type UpdateNGOType = z.infer<typeof UpdateNGODTO>;
export type VerifyNGOType = z.infer<typeof VerifyNGODTO>;
export type ChangePasswordType = z.infer<typeof ChangePasswordDTO>;
export type ForgotPasswordType = z.infer<typeof ForgotPasswordDTO>;
export type VerifyResetCodeType = z.infer<typeof VerifyResetCodeDTO>;
export type ResetPasswordType = z.infer<typeof ResetPasswordDTO>;
