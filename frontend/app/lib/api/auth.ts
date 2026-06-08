import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

// ── Types 

export type RegisterDonorPayload = {
  username: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender?: "male" | "female" | "other";
  address?: string;
};

export type RegisterNGOPayload = {
  organizationName: string;
  registrationNumber: string;
  yearEstablished: string;
  contactPerson: string;
  email: string;
  password: string;
  impactDescription: string;
  address?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

// ── Donor API 

export const donorRegisterApi = async (payload: RegisterDonorPayload) => {
  const res = await axiosInstance.post<
    AuthResponse<{ donor: unknown; token?: string }>
  >(API.DONOR.REGISTER, payload);
  return res.data;
};

export const donorLoginApi = async (payload: LoginPayload) => {
  const res = await axiosInstance.post<
    AuthResponse<{ donor: { _id: string; email: string; role: string }; token: string }>
  >(API.DONOR.LOGIN, payload);
  return res.data;
};

// ── NGO API ──

export const ngoRegisterApi = async (payload: RegisterNGOPayload) => {
  const res = await axiosInstance.post<
    AuthResponse<{ ngo: unknown; token?: string }>
  >(API.NGO.REGISTER, payload);
  return res.data;
};

export const ngoLoginApi = async (payload: LoginPayload) => {
  const res = await axiosInstance.post<
    AuthResponse<{ ngo: { _id: string; email: string; role: string }; token: string }>
  >(API.NGO.LOGIN, payload);
  return res.data;
};
