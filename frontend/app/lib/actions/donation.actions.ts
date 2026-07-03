import {
  createDonationApi,
  getMyDonationsApi,
  getDonationByIdApi,
  updateDonationApi,
  deleteDonationApi,
  deleteDonationPhotoApi,
  Donation,
  getPendingDonationsApi,
  approveRejectDonationApi,
  getAvailableDonationsApi,
  claimDonationApi,
  completeDonationApi,
  getNgoClaimedDonationsApi,
} from "../api/donation.api";

type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> };

// ── Donor Donation Actions

export const createDonationAction = async (
  formData: FormData,
): Promise<ActionResult<{ donation: Donation }>> => {
  try {
    const res = await createDonationApi(formData);
    return { success: true, data: { donation: res.data } };
  } catch (err: any) {
    return {
      success: false,
      errors: { root: err?.response?.data?.message || "Failed to create donation" },
    };
  }
};

export const getMyDonationsAction = async (): Promise<
  ActionResult<{ donations: Donation[] }>
> => {
  try {
    const res = await getMyDonationsApi();
    return { success: true, data: { donations: res.data } };
  } catch (err: any) {
    return {
      success: false,
      errors: { root: "Failed to fetch donations" },
    };
  }
};

export const getDonationByIdAction = async (
  id: string,
): Promise<ActionResult<{ donation: Donation }>> => {
  try {
    const res = await getDonationByIdApi(id);
    return { success: true, data: { donation: res.data } };
  } catch (err: any) {
    return {
      success: false,
      errors: { root: "Failed to fetch donation" },
    };
  }
};

export const updateDonationAction = async (
  id: string,
  formData: FormData,
): Promise<ActionResult<{ donation: Donation }>> => {
  try {
    const res = await updateDonationApi(id, formData);
    return { success: true, data: { donation: res.data } };
  } catch (err: any) {
    return {
      success: false,
      errors: { root: err?.response?.data?.message || "Failed to update donation" },
    };
  }
};

export const deleteDonationAction = async (
  id: string,
): Promise<ActionResult> => {
  try {
    await deleteDonationApi(id);
    return { success: true, data: undefined };
  } catch (err: any) {
    return {
      success: false,
      errors: { root: "Failed to delete donation" },
    };
  }
};

export const deleteDonationPhotoAction = async (
  id: string,
  photoPath: string,
): Promise<ActionResult<{ donation: Donation }>> => {
  try {
    const res = await deleteDonationPhotoApi(id, photoPath);
    return { success: true, data: { donation: res.data } };
  } catch (err: any) {
    return {
      success: false,
      errors: { root: "Failed to delete photo" },
    };
  }
};

// ── Admin Donation Actions

export const getPendingDonationsAction = async (): Promise<
  ActionResult<{ donations: Donation[] }>
> => {
  try {
    const res = await getPendingDonationsApi();
    return { success: true, data: { donations: res.data } };
  } catch (err: any) {
    return {
      success: false,
      errors: { root: "Failed to fetch pending donations" },
    };
  }
};

export const approveRejectDonationAction = async (
  id: string,
  adminStatus: "Approved" | "Rejected",
  adminRejectionReason?: string,
): Promise<ActionResult<{ donation: Donation }>> => {
  try {
    const res = await approveRejectDonationApi(id, {
      adminStatus,
      adminRejectionReason,
    });
    return { success: true, data: { donation: res.data } };
  } catch (err: any) {
    return {
      success: false,
      errors: { root: err?.response?.data?.message || "Failed to update donation status" },
    };
  }
};

// ── NGO Donation Actions

export const getAvailableDonationsAction = async (): Promise<
  ActionResult<{ donations: Donation[] }>
> => {
  try {
    const res = await getAvailableDonationsApi();
    return { success: true, data: { donations: res.data } };
  } catch (err: any) {
    return {
      success: false,
      errors: { root: "Failed to fetch available donations" },
    };
  }
};

export const claimDonationAction = async (
  id: string,
  estimatedPickupTime?: string,
): Promise<ActionResult<{ donation: Donation }>> => {
  try {
    const res = await claimDonationApi(id, { estimatedPickupTime });
    return { success: true, data: { donation: res.data } };
  } catch (err: any) {
    return {
      success: false,
      errors: { root: err?.response?.data?.message || "Failed to claim donation" },
    };
  }
};

export const completeDonationAction = async (
  id: string,
  pointsEarned?: number,
): Promise<ActionResult<{ donation: Donation }>> => {
  try {
    const res = await completeDonationApi(id, { pointsEarned });
    return { success: true, data: { donation: res.data } };
  } catch (err: any) {
    return {
      success: false,
      errors: { root: err?.response?.data?.message || "Failed to complete donation" },
    };
  }
};

export const getNgoClaimedDonationsAction = async (
  status?: string,
): Promise<ActionResult<{ donations: Donation[] }>> => {
  try {
    const res = await getNgoClaimedDonationsApi(status);
    return { success: true, data: { donations: res.data } };
  } catch (err: any) {
    return {
      success: false,
      errors: { root: "Failed to fetch claimed donations" },
    };
  }
};
