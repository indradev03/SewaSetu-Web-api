import { z } from "zod";

// ── AI Generated Donation Item Response
export const AIGeneratedItemDTO = z.object({
  category: z.enum(["Food", "Clothes", "Others"]),
  title: z.string().min(1).max(100),
  description: z.string().min(20).max(150),
  quantity: z.number().min(1),
  unit: z.enum(["Pieces", "Kgs", "Packets", "Liters"]),
  confidence: z.number().min(0).max(100),
});

// ── Type
export type AIGeneratedItemType = z.infer<typeof AIGeneratedItemDTO>;
