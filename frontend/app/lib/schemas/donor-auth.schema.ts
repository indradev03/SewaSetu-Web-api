import { z } from "zod";

export const donorRegisterSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    phoneNumber: z.string().min(7, "Phone number is required"),
    gender: z.enum(["male", "female", "other"]).optional(),
    address: z.string().optional(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const donorLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type DonorRegisterInput = z.infer<typeof donorRegisterSchema>;

export type DonorLoginInput = z.infer<typeof donorLoginSchema>;
