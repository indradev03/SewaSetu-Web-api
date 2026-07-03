// lib/api/admin/rewards.ts

import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

// ── Types ──────────────────────────────────────────────

export type DiscountType = "percentage" | "fixed" | "freebie";

export type Reward = {
  _id: string;
  title: string;
  partnerName: string;
  description: string;
  image?: string;
  promoCode: string;
  discountType: "percentage" | "fixed" | "freebie";
  discountValue: number;
  terms?: string;
  expiryDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type RewardListParams = {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
};

// ── CREATE REWARD (multipart, supports image upload) ─

export const createReward = async (payload: any) => {
  const response = await axiosInstance.post(API.ADMIN.REWARDS, payload);
  return response.data;
};

// ── UPDATE REWARD (multipart, supports image upload) ─

export const updateReward = async (id: string, payload: FormData) => {
  const response = await axiosInstance.put(API.ADMIN.REWARD_BY_ID(id), payload);
  return response.data;
};

// ── GET ALL REWARDS ───────────────────────────────────

export const getAllRewards = async ({
  page,
  limit,
  search,
  isActive,
}: RewardListParams) => {
  try {
    const response = await axiosInstance.get(API.ADMIN.REWARDS, {
      params: { page, limit, search, isActive },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Fetch rewards failed");
  }
};

// ── GET ACTIVE REWARDS ────────────────────────────────

export const getActiveRewards = async () => {
  try {
    const response = await axiosInstance.get(API.ADMIN.ACTIVE_REWARDS);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Fetch active rewards failed",
    );
  }
};

// ── GET REWARD BY ID ──────────────────────────────────

export const getRewardById = async (id: string) => {
  try {
    const response = await axiosInstance.get(API.ADMIN.REWARD_BY_ID(id));
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Fetch reward failed");
  }
};

// ── TOGGLE STATUS ─────────────────────────────────────

export const toggleRewardStatus = async (id: string) => {
  try {
    const response = await axiosInstance.patch(
      API.ADMIN.TOGGLE_REWARD_STATUS(id),
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Toggle reward status failed",
    );
  }
};

// ── DELETE REWARD ─────────────────────────────────────

export const deleteReward = async (id: string) => {
  try {
    const response = await axiosInstance.delete(API.ADMIN.REWARD_BY_ID(id));
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Delete reward failed");
  }
};
