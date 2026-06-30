import { z } from "zod";

// Shared enum
export const DiscountTypeDTO = z.enum(["percentage", "fixed", "freebie"]);

// Shared reward fields
const RewardFields = {
  title: z.string().trim().min(1, "Title is required"),

  partnerName: z.string().trim().min(1, "Partner name is required"),

  description: z.string().trim().min(1, "Description is required"),

  image: z.string().url().optional(),

  promoCode: z
    .string()
    .trim()
    .min(1, "Promo code is required")
    .transform((code) => code.toUpperCase()),

  discountType: DiscountTypeDTO,

  discountValue: z.coerce
    .number({
      error: "Discount value is required",
    })
    .min(0, "Discount value cannot be negative"),

  terms: z.string().trim().optional(),

  expiryDate: z.coerce.date(),

  isActive: z.boolean().optional(),
};

// ─────────────────────────────
// Create Reward
// ─────────────────────────────
export const CreateRewardDTO = z
  .object(RewardFields)
  .superRefine((data, ctx) => {
    if (data.discountType === "percentage" && data.discountValue > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["discountValue"],
        message: "Percentage discount cannot exceed 100.",
      });
    }

    if (data.discountType === "freebie" && data.discountValue !== 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["discountValue"],
        message: "Freebie rewards must have a discount value of 0.",
      });
    }

    if (data.expiryDate <= new Date()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["expiryDate"],
        message: "Expiry date must be in the future.",
      });
    }
  });

// ─────────────────────────────
// Update Reward
// ─────────────────────────────
export const UpdateRewardDTO = z
  .object({
    title: RewardFields.title.optional(),
    partnerName: RewardFields.partnerName.optional(),
    description: RewardFields.description.optional(),
    image: RewardFields.image.optional(),
    promoCode: RewardFields.promoCode.optional(),
    discountType: RewardFields.discountType.optional(),
    discountValue: RewardFields.discountValue.optional(),
    terms: RewardFields.terms.optional(),
    expiryDate: RewardFields.expiryDate.optional(),
    isActive: RewardFields.isActive,
  })
  .superRefine((data, ctx) => {
    if (
      data.discountType === "percentage" &&
      data.discountValue !== undefined &&
      data.discountValue > 100
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["discountValue"],
        message: "Percentage discount cannot exceed 100.",
      });
    }

    if (
      data.discountType === "freebie" &&
      data.discountValue !== undefined &&
      data.discountValue !== 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["discountValue"],
        message: "Freebie rewards must have a discount value of 0.",
      });
    }

    if (data.expiryDate && data.expiryDate <= new Date()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["expiryDate"],
        message: "Expiry date must be in the future.",
      });
    }
  });

// ─────────────────────────────
// Reward Query
// ─────────────────────────────
export const RewardQueryDTO = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().trim().optional(),
  isActive: z.coerce.boolean().optional(),
});

// ─────────────────────────────
// Types
// ─────────────────────────────
export type CreateRewardType = z.infer<typeof CreateRewardDTO>;
export type UpdateRewardType = z.infer<typeof UpdateRewardDTO>;
export type RewardQueryType = z.infer<typeof RewardQueryDTO>;
