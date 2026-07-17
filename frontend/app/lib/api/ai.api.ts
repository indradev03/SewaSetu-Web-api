import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

// ── Types

export type AIGeneratedItem = {
  category: "Food" | "Clothes" | "Others";
  title: string;
  description: string;
  quantity: number;
  unit: "Pieces" | "Kgs" | "Packets" | "Liters";
  confidence: number;
};

// ── AI APIs

export const generateDonationItemApi = async (
  imageFile: File,
): Promise<{ success: boolean; message: string; data: AIGeneratedItem }> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const res = await axiosInstance.post(API.AI.GENERATE_ITEM, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
