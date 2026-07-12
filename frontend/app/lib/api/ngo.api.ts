import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

// ── Types

export type NGO = {
  _id: string;
  organizationName: string;
  registrationNumber: string;
  yearEstablished: string;
  contactPerson: string;
  email: string;
  impactDescription: string;
  address?: string;
  profileImage?: string;
  isVerified: boolean;
  registrationDocPath?: string;
  panCardPath?: string;
  role: "ngo";
};

export type UpdateNGOPayload = {
  organizationName?: string;
  contactPerson?: string;
  impactDescription?: string;
  address?: string;
};

// ── GET PROFILE
export const getNgoProfileApi = async (): Promise<{
  success: boolean;
  message: string;
  data: NGO;
}> => {
  const res = await axiosInstance.get(API.NGO.PROFILE);
  return res.data;
};

// ── UPDATE PROFILE (with image upload)
export const updateNgoProfileApi = async (
  payload: FormData,
): Promise<{ success: boolean; message: string; data: NGO }> => {
  const res = await axiosInstance.put(API.NGO.PROFILE, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// ── DELETE ACCOUNT
export const deleteNgoAccountApi = async () => {
  const res = await axiosInstance.delete(API.NGO.PROFILE);
  return res.data;
};

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export async function changePasswordApi(payload: ChangePasswordPayload) {
  const res = await axiosInstance.put(API.NGO.CHANGE_PASSWORD, payload);

  return res.data;
}
