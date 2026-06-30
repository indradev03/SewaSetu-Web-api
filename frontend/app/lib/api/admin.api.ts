import axiosInstance from "./axios-instance";
import { API } from "./endpoints";
import { Donor } from "./donor.api";

// ── Types ──────────────────────────────────────────────

// Donor as returned inside admin list/detail endpoints. Same shape as the
// donor's own profile, plus the createdAt timestamp Mongoose adds at runtime
// (not declared on the donor's own type, but it is genuinely in the response).
export type AdminDonorRow = Donor & { createdAt?: string };

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
  role: "ngo";
  createdAt?: string;
};

export type DashboardStats = {
  totalDonors: number;
  totalAdmins: number;
  totalNGOs: number;
  verifiedNGOs: number;
  pendingNGOs: number;
};

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  success: boolean;
  message: string;
  data: T[];
  meta: PaginationMeta;
};

export type ListParams = {
  page?: number;
  limit?: number;
  search?: string;
};

// ── Dashboard ──────────────────────────────────────────

export const getAdminDashboardApi = async (): Promise<{
  success: boolean;
  message: string;
  data: DashboardStats;
}> => {
  const res = await axiosInstance.get(API.ADMIN.DASHBOARD);
  return res.data;
};

// ── Donors ─────────────────────────────────────────────

export const getAllDonorsApi = async (
  params: ListParams = {},
): Promise<PaginatedResponse<AdminDonorRow>> => {
  const res = await axiosInstance.get(API.ADMIN.DONORS, { params });
  return res.data;
};

export const getDonorByIdApi = async (
  id: string,
): Promise<{ success: boolean; message: string; data: AdminDonorRow }> => {
  const res = await axiosInstance.get(API.ADMIN.DONOR_BY_ID(id));
  return res.data;
};

export const deleteDonorApi = async (id: string) => {
  const res = await axiosInstance.delete(API.ADMIN.DONOR_BY_ID(id));
  return res.data;
};

// ── NGOs ───────────────────────────────────────────────

export const getAllNGOsApi = async (
  params: ListParams = {},
): Promise<PaginatedResponse<NGO>> => {
  const res = await axiosInstance.get(API.ADMIN.NGOS, { params });
  return res.data;
};

export const getNGOByIdApi = async (
  id: string,
): Promise<{ success: boolean; message: string; data: NGO }> => {
  const res = await axiosInstance.get(API.ADMIN.NGO_BY_ID(id));
  return res.data;
};

export const deleteNGOApi = async (id: string) => {
  const res = await axiosInstance.delete(API.ADMIN.NGO_BY_ID(id));
  return res.data;
};

export const verifyNGOApi = async (id: string, isVerified: boolean) => {
  const res = await axiosInstance.patch(API.NGO.VERIFY(id), { isVerified });
  return res.data;
};
