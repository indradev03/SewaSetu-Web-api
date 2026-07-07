import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

// ── Types

export type Donation = {
  _id: string;
  donorId: {
    _id: string;
    username: string;
    fullName: string;
    email: string;
    profileImage?: string;
  };
  category: "Food" | "Clothes" | "Others";
  title: string;
  description: string;
  quantity: number;
  unit: "Pieces" | "Kgs" | "Packets" | "Liters";
  photos: string[];
  pickupAddress: string;
  adminStatus: "Pending" | "Approved" | "Rejected";
  adminRejectionReason?: string;
  claimedByNgoId?: {
    _id: string;
    organizationName: string;
    email: string;
    contactPerson?: string;
    profileImage?: string;
    address?: string;
  };
  claimedAt?: string;
  status: "Available" | "Claimed" | "PickedUp" | "Completed";
  rewardPointsAwarded: number;
  rewardGranted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateDonationPayload = {
  category: "Food" | "Clothes" | "Others";
  title: string;
  description: string;
  quantity: number;
  unit: "Pieces" | "Kgs" | "Packets" | "Liters";
  pickupAddress: string;
  photos?: string[];
};

export type UpdateDonationPayload = Partial<CreateDonationPayload>;

export type ApproveRejectDonationPayload = {
  adminStatus: "Approved" | "Rejected";
  adminRejectionReason?: string;
};

export type ClaimDonationPayload = {
  estimatedPickupTime?: string;
};

export type CompleteDonationPayload = {
  pointsEarned?: number;
};

// ── Donor Donation APIs

export const createDonationApi = async (
  payload: FormData,
): Promise<{ success: boolean; message: string; data: Donation }> => {
  const res = await axiosInstance.post(API.DONATION.CREATE, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getMyDonationsApi = async (): Promise<{
  success: boolean;
  message: string;
  data: Donation[];
}> => {
  const res = await axiosInstance.get(API.DONOR.MY_DONATIONS);
  return res.data;
};

export const getDonationByIdApi = async (
  id: string,
): Promise<{ success: boolean; message: string; data: Donation }> => {
  const res = await axiosInstance.get(API.DONATION.BY_ID(id));
  return res.data;
};

export const updateDonationApi = async (
  id: string,
  payload: FormData,
): Promise<{ success: boolean; message: string; data: Donation }> => {
  const res = await axiosInstance.put(API.DONATION.UPDATE(id), payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteDonationApi = async (
  id: string,
): Promise<{ success: boolean; message: string; data: Donation }> => {
  const res = await axiosInstance.delete(API.DONATION.DELETE(id));
  return res.data;
};

export const deleteDonationPhotoApi = async (
  id: string,
  photoPath: string,
): Promise<{ success: boolean; message: string; data: Donation }> => {
  const res = await axiosInstance.delete(API.DONATION.DELETE_PHOTO(id), {
    data: { photoPath },
  });
  return res.data;
};

// ── Admin Donation APIs

export const getAllDonationsApi = async (): Promise<{
  success: boolean;
  message: string;
  data: Donation[];
}> => {
  const res = await axiosInstance.get("/donation/admin/all");
  return res.data;
};

export const getPendingDonationsApi = async (): Promise<{
  success: boolean;
  message: string;
  data: Donation[];
}> => {
  const res = await axiosInstance.get(API.ADMIN.PENDING_DONATIONS);
  return res.data;
};

export const approveRejectDonationApi = async (
  id: string,
  payload: ApproveRejectDonationPayload,
): Promise<{ success: boolean; message: string; data: Donation }> => {
  const res = await axiosInstance.put(API.ADMIN.APPROVE_DONATION(id), payload);
  return res.data;
};

export const adminDeleteDonationApi = async (
  id: string,
): Promise<{ success: boolean; message: string; data: Donation }> => {
  const res = await axiosInstance.delete(`/donation/admin/${id}`);
  return res.data;
};

// ── NGO Donation APIs

export const getAvailableDonationsApi = async (): Promise<{
  success: boolean;
  message: string;
  data: Donation[];
}> => {
  const res = await axiosInstance.get(API.NGO.AVAILABLE_DONATIONS);
  return res.data;
};

export const claimDonationApi = async (
  id: string,
  payload?: ClaimDonationPayload,
): Promise<{ success: boolean; message: string; data: Donation }> => {
  const res = await axiosInstance.post(API.NGO.CLAIM_DONATION(id), payload);
  return res.data;
};

export const pickupDonationApi = async (
  id: string,
): Promise<{ success: boolean; message: string; data: Donation }> => {
  const res = await axiosInstance.patch(API.NGO.PICKUP_DONATION(id));
  return res.data;
};

export const releaseClaimApi = async (
  id: string,
): Promise<{ success: boolean; message: string; data: Donation }> => {
  const res = await axiosInstance.patch(`/donation/ngo/${id}/release`);
  return res.data;
};

export const deleteClaimedDonationApi = async (
  id: string,
): Promise<{ success: boolean; message: string; data: Donation }> => {
  const res = await axiosInstance.delete(`/donation/ngo/${id}`);
  return res.data;
};

export const completeDonationApi = async (
  id: string,
  payload?: CompleteDonationPayload,
): Promise<{ success: boolean; message: string; data: Donation }> => {
  const res = await axiosInstance.patch(API.NGO.COMPLETE_DONATION(id), payload);
  return res.data;
};

export const getNgoClaimedDonationsApi = async (
  status?: string,
): Promise<{ success: boolean; message: string; data: Donation[] }> => {
  const res = await axiosInstance.get(API.NGO.CLAIMED_DONATIONS, {
    params: status ? { status } : undefined,
  });
  return res.data;
};
