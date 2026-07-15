import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

// ── Types

export type Donor = {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender?: "male" | "female" | "other";
  address?: string;
  profileImage?: string;
  role: "donor" | "admin";
  rewardPoints?: number;
};

export type UpdateDonorPayload = {
  fullName?: string;
  phoneNumber?: string;
  gender?: "male" | "female" | "other";
  address?: string;
};

// ── GET PROFILE
export const getDonorProfileApi = async (): Promise<{
  success: boolean;
  message: string;
  data: Donor;
}> => {
  const res = await axiosInstance.get(API.DONOR.PROFILE);
  return res.data;
};

// ── UPDATE PROFILE (with image upload)
export const updateDonorProfileApi = async (
  payload: FormData,
): Promise<{ success: boolean; message: string; data: Donor }> => {
  const res = await axiosInstance.put(API.DONOR.UPDATE_PROFILE, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// ── REMOVE PROFILE IMAGE
export const removeDonorProfileImageApi = async () => {
  const res = await axiosInstance.delete(API.DONOR.REMOVE_PROFILE_IMAGE);
  return res.data;
};

// ── DELETE ACCOUNT
export const deleteDonorAccountApi = async () => {
  const res = await axiosInstance.delete(API.DONOR.DELETE_PROFILE);
  return res.data;
};

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export async function changePasswordApi(payload: ChangePasswordPayload) {
  const res = await axiosInstance.put(API.DONOR.CHANGE_PASSWORD, payload);

  return res.data;
}

export const getRewardHistoryApi = async (): Promise<{
  success: boolean;
  message: string;
  data: any[];
}> => {
  const res = await axiosInstance.get("/donor/reward-history");
  return res.data;
};

export type DonorStatistics = {
  totalDonations: number;
  acceptedDonations: number;
  completedDonations: number;
  pendingDonations: number;
  rejectedDonations: number;
  totalRewardPoints: number;
};

export const getDonorStatisticsApi = async (): Promise<{
  success: boolean;
  message: string;
  data: DonorStatistics;
}> => {
  const res = await axiosInstance.get(API.DONOR.STATISTICS);
  return res.data;
};

export type Donation = {
  _id: string;
  donorId: string;
  category: "Food" | "Clothes" | "Others";
  title: string;
  description: string;
  quantity: number;
  unit: "Pieces" | "Kgs" | "Packets" | "Liters";
  photos: string[];
  pickupAddress: string;
  adminStatus: "Pending" | "Approved" | "Rejected";
  adminRejectionReason?: string;
  claimedByNgoId?: string;
  claimedAt?: string;
  status: "Available" | "Claimed" | "PickedUp" | "Completed";
  rewardPointsAwarded: number;
  rewardGranted: boolean;
  createdAt: string;
  updatedAt: string;
  donor?: any;
  claimedByNgo?: any;
};

export const getRecentDonationsApi = async (limit: number = 5): Promise<{
  success: boolean;
  message: string;
  data: Donation[];
}> => {
  const res = await axiosInstance.get(`${API.DONOR.MY_DONATIONS}?limit=${limit}`);
  return res.data;
};
