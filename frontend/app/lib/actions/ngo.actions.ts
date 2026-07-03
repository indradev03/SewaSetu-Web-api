import { z } from "zod";
import { ngoRegisterApi, ngoLoginApi } from "../api/auth";
import { setCookie } from "../cookies";

//  Zod Schemas

export const ngoRegisterSchema = z
  .object({
    organizationName: z.string().min(1, "Organization name is required"),
    registrationNumber: z.string().min(1, "Registration number is required"),
    yearEstablished: z.string().min(4, "Year established is required"),
    contactPerson: z.string().min(1, "Contact person name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    impactDescription: z
      .string()
      .min(10, "Please describe your mission (min 10 chars)"),
    address: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const ngoLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

//  Types

export type NGORegisterInput = z.infer<typeof ngoRegisterSchema>;
export type NGOLoginInput = z.infer<typeof ngoLoginSchema>;

//  Action result type

type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> };

//  registerNGOAction

export const registerNGOAction = async (
  formData: NGORegisterInput,
): Promise<ActionResult> => {
  // 1. Validate with Zod
  const parsed = ngoRegisterSchema.safeParse(formData);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      const key = issue.path[0] as string;
      errors[key] = issue.message;
    });
    return { success: false, errors };
  }

  // 2. Strip confirmPassword and call API
  const { confirmPassword: _, ...payload } = parsed.data;

  try {
    await ngoRegisterApi(payload);
    return { success: true, data: undefined };
  } catch (err: unknown) {
    const message =
      (err as { response?: { data?: { message?: string } } })?.response?.data
        ?.message ?? "Registration failed. Please try again.";
    return { success: false, errors: { root: message } };
  }
};

//  loginNGOAction

export const loginNGOAction = async (
  formData: NGOLoginInput,
): Promise<ActionResult<{ role: string }>> => {
  const parsed = ngoLoginSchema.safeParse(formData);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      const key = issue.path[0] as string;
      errors[key] = issue.message;
    });
    return { success: false, errors };
  }

  try {
    const response = await ngoLoginApi(parsed.data);
    const { token, ngo } = response.data;

    setCookie("token", token);
    setCookie("role", ngo.role);
    setCookie("userId", String(ngo._id));

    return { success: true, data: { role: ngo.role } };
  } catch (err: unknown) {
    const message =
      (err as { response?: { data?: { message?: string } } })?.response?.data
        ?.message ?? "Login failed. Please check your credentials.";
    return { success: false, errors: { root: message } };
  }
};
