import { z } from "zod";
import { donorRegisterApi, donorLoginApi } from "../api/auth";
import { setCookie } from "../cookies";

//  Zod Schemas 

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
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const donorLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

//  Types 

export type DonorRegisterInput = z.infer<typeof donorRegisterSchema>;
export type DonorLoginInput = z.infer<typeof donorLoginSchema>;

//  Action result type 

type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> };

//  registerDonorAction 
// Component → Action → API

export const registerDonorAction = async (
  formData: DonorRegisterInput
): Promise<ActionResult> => {
  // 1. Validate with Zod
  const parsed = donorRegisterSchema.safeParse(formData);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      const key = issue.path[0] as string;
      errors[key] = issue.message;
    });
    return { success: false, errors };
  }

  // 2. Call API (strip confirmPassword and terms before sending)
  const { confirmPassword: _, terms: __, ...payload } = parsed.data;

  try {
    await donorRegisterApi(payload);
    return { success: true, data: undefined };
  } catch (err: unknown) {
    const message =
      (err as { response?: { data?: { message?: string } } })?.response?.data
        ?.message ?? "Registration failed. Please try again.";
    return { success: false, errors: { root: message } };
  }
};

//  loginDonorAction 

export const loginDonorAction = async (
  formData: DonorLoginInput
): Promise<ActionResult<{ role: string }>> => {
  // 1. Validate
  const parsed = donorLoginSchema.safeParse(formData);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      const key = issue.path[0] as string;
      errors[key] = issue.message;
    });
    return { success: false, errors };
  }

  // 2. Call API
  try {
    const response = await donorLoginApi(parsed.data);
    const { token, donor } = response.data;

    // 3. Store token in cookie
    setCookie("token", token);
    setCookie("role", donor.role);
    setCookie("userId", String(donor._id));

    return { success: true, data: { role: donor.role } };
  } catch (err: unknown) {
    const message =
      (err as { response?: { data?: { message?: string } } })?.response?.data
        ?.message ?? "Login failed. Please check your credentials.";
    return { success: false, errors: { root: message } };
  }
};