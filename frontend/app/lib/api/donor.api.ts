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
