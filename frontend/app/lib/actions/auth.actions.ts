import {
  donorForgotPasswordApi,
  donorVerifyResetCodeApi,
  donorResetPasswordApi,
  ngoForgotPasswordApi,
  ngoVerifyResetCodeApi,
  ngoResetPasswordApi,
  type ForgotPasswordPayload,
  type VerifyResetCodePayload,
  type ResetPasswordPayload,
} from "../api/auth";

type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> };

// ── Forgot Password Actions

export const forgotPasswordAction = async (
  formData: ForgotPasswordPayload,
  userType: "donor" | "ngo",
): Promise<ActionResult> => {
  try {
    if (userType === "donor") {
      await donorForgotPasswordApi(formData);
    } else {
      await ngoForgotPasswordApi(formData);
    }
    return { success: true, data: undefined };
  } catch (err: unknown) {
    const message =
      (err as { response?: { data?: { message?: string } } })?.response?.data
        ?.message ?? "Failed to send reset code. Please try again.";
    return { success: false, errors: { root: message } };
  }
};

export const verifyResetCodeAction = async (
  formData: VerifyResetCodePayload,
  userType: "donor" | "ngo",
): Promise<ActionResult> => {
  try {
    if (userType === "donor") {
      await donorVerifyResetCodeApi(formData);
    } else {
      await ngoVerifyResetCodeApi(formData);
    }
    return { success: true, data: undefined };
  } catch (err: unknown) {
    const message =
      (err as { response?: { data?: { message?: string } } })?.response?.data
        ?.message ?? "Invalid or expired code. Please try again.";
    return { success: false, errors: { root: message } };
  }
};

export const resetPasswordAction = async (
  formData: ResetPasswordPayload,
  userType: "donor" | "ngo",
): Promise<ActionResult> => {
  try {
    if (userType === "donor") {
      await donorResetPasswordApi(formData);
    } else {
      await ngoResetPasswordApi(formData);
    }
    return { success: true, data: undefined };
  } catch (err: unknown) {
    const message =
      (err as { response?: { data?: { message?: string } } })?.response?.data
        ?.message ?? "Failed to reset password. Please try again.";
    return { success: false, errors: { root: message } };
  }
};
