import { deleteDonorApi, deleteNGOApi, verifyNGOApi } from "../api/admin.api";

// ── Action result type (same shape as donor.actions.ts / ngo.actions.ts)

type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> };

function extractErrorMessage(err: unknown, fallback: string): string {
  return (
    (err as { response?: { data?: { message?: string } } })?.response?.data
      ?.message ?? fallback
  );
}

// ── deleteDonorAction

export const deleteDonorAction = async (id: string): Promise<ActionResult> => {
  try {
    await deleteDonorApi(id);
    return { success: true, data: undefined };
  } catch (err: unknown) {
    return {
      success: false,
      errors: { root: extractErrorMessage(err, "Failed to delete donor") },
    };
  }
};

// ── deleteNGOAction

export const deleteNGOAction = async (id: string): Promise<ActionResult> => {
  try {
    await deleteNGOApi(id);
    return { success: true, data: undefined };
  } catch (err: unknown) {
    return {
      success: false,
      errors: { root: extractErrorMessage(err, "Failed to delete NGO") },
    };
  }
};

// ── verifyNGOAction

export const verifyNGOAction = async (
  id: string,
  isVerified: boolean,
): Promise<ActionResult> => {
  try {
    await verifyNGOApi(id, isVerified);
    return { success: true, data: undefined };
  } catch (err: unknown) {
    return {
      success: false,
      errors: {
        root: extractErrorMessage(err, "Failed to update NGO verification"),
      },
    };
  }
};
