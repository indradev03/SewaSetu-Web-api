import { donorRegisterApi, donorLoginApi } from "../api/auth";
import { setCookie } from "../cookies";
import {
  changePasswordApi,
  Donor,
  getDonorProfileApi,
  removeDonorProfileImageApi,
  updateDonorProfileApi,
} from "../api/donor.api";
import {
  DonorLoginInput,
  donorLoginSchema,
  DonorRegisterInput,
  donorRegisterSchema,
} from "../schemas/donor-auth.schema";
import {
  ChangePasswordInput,
  changePasswordSchema,
} from "../schemas/donor-profile.schema";

//  Action result type

type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> };

//  registerDonorAction
// Component → Action → API

export const registerDonorAction = async (
  formData: DonorRegisterInput,
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
  formData: DonorLoginInput,
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

// get profile action
export const getDonorProfileAction = async (): Promise<
  ActionResult<{ donor: Donor }>
> => {
  try {
    const res = await getDonorProfileApi();
    return { success: true, data: { donor: res.data } };
  } catch (err: any) {
    return {
      success: false,
      errors: { root: "Failed to fetch profile" },
    };
  }
};

// update profile
export const updateDonorProfileAction = async (
  formData: FormData,
): Promise<ActionResult<{ donor: Donor }>> => {
  try {
    const res = await updateDonorProfileApi(formData);
    return { success: true, data: { donor: res.data } };
  } catch (err: any) {
    return {
      success: false,
      errors: { root: "Profile update failed" },
    };
  }
};

// remove profile action
export const removeDonorProfileImageAction =
  async (): Promise<ActionResult> => {
    try {
      await removeDonorProfileImageApi();
      return { success: true, data: undefined };
    } catch (err: any) {
      return {
        success: false,
        errors: { root: "Failed to remove image" },
      };
    }
  };

// Change Password Action
export const changePasswordAction = async (
  formData: ChangePasswordInput,
): Promise<ActionResult> => {
  const parsed = changePasswordSchema.safeParse(formData);

  if (!parsed.success) {
    const errors: Record<string, string> = {};

    parsed.error.issues.forEach((issue) => {
      const key = issue.path[0] as string;
      errors[key] = issue.message;
    });

    return {
      success: false,
      errors,
    };
  }

  try {
    await changePasswordApi(parsed.data);

    return {
      success: true,
      data: undefined,
    };
  } catch (err: any) {
    return {
      success: false,
      errors: {
        root: err?.response?.data?.message || "Failed to change password",
      },
    };
  }
};
