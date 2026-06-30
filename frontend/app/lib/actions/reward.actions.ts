"use server";
import {
  getAllRewards,
  deleteReward,
  toggleRewardStatus,
  createReward,
  updateReward,
} from "../api/rewards.api";

import { revalidatePath } from "next/cache";

// ── CREATE ────────────────────────────────────────────

export async function handleCreateReward(formData: FormData) {
  try {
    const response = await createReward(formData);

    if (response.success) {
      revalidatePath("/admin/rewards");
      return {
        success: true,
        message: response.message || "Reward created successfully",
        data: response.data,
      };
    }

    return {
      success: false,
      message: response.message || "Failed to create reward",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Failed to create reward",
    };
  }
}

// ── UPDATE ────────────────────────────────────────────

export async function handleUpdateReward(id: string, formData: FormData) {
  try {
    const response = await updateReward(id, formData);

    if (response.success) {
      revalidatePath("/admin/rewards");
      return {
        success: true,
        message: response.message || "Reward updated successfully",
        data: response.data,
      };
    }

    return {
      success: false,
      message: response.message || "Failed to update reward",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Failed to update reward",
    };
  }
}

// ── GET ALL REWARDS ───────────────────────────────────

export async function handleGetAllRewards(params: {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}) {
  try {
    const response = await getAllRewards({
      page: params.page || 1,
      limit: params.limit || 10,
      search: params.search || "",
      isActive: params.isActive,
    });

    if (response.success) {
      return {
        success: true,
        data: response.data,
        pagination: response.meta,
      };
    }

    return {
      success: false,
      data: [],
      pagination: null,
    };
  } catch (err: any) {
    throw new Error(err.message || "Failed to get rewards");
  }
}

// ── DELETE ────────────────────────────────────────────

export async function handleDeleteReward(id: string) {
  try {
    const response = await deleteReward(id);

    if (response.success) {
      revalidatePath("/admin/rewards");
      return {
        success: true,
        message: response.message || "Reward deleted successfully",
      };
    }

    return {
      success: false,
      message: response.message || "Failed to delete reward",
    };
  } catch (err: any) {
    throw new Error(err.message || "Failed to delete reward");
  }
}

// ── TOGGLE STATUS ─────────────────────────────────────

export async function handleToggleRewardStatus(id: string) {
  try {
    const response = await toggleRewardStatus(id);

    if (response.success) {
      revalidatePath("/admin/rewards");
      return {
        success: true,
        message: response.message || "Reward status updated successfully",
      };
    }

    return {
      success: false,
      message: response.message || "Failed to update reward status",
    };
  } catch (err: any) {
    throw new Error(err.message || "Failed to update reward status");
  }
}
