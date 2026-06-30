import { Schema, model, Document } from "mongoose";

export enum DiscountType {
  PERCENTAGE = "percentage",
  FIXED = "fixed",
  FREEBIE = "freebie",
}

export interface IReward extends Document {
  title: string;
  partnerName: string;
  description: string;
  image?: string;
  promoCode: string;
  discountType: DiscountType;
  discountValue: number;
  terms?: string;
  expiryDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const rewardSchema = new Schema<IReward>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    partnerName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: null,
    },

    promoCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    discountType: {
      type: String,
      enum: Object.values(DiscountType),
      required: true,
    },

    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },

    terms: {
      type: String,
      default: "",
      trim: true,
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const RewardModel = model<IReward>("Reward", rewardSchema);
