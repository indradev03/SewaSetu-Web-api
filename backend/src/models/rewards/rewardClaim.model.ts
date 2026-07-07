import mongoose, { Schema, Document } from "mongoose";

export interface IRewardClaim extends Document {
  donorId: mongoose.Types.ObjectId;
  rewardId: mongoose.Types.ObjectId;
  pointsUsed: number;
  promoCode: string;
  claimedAt: Date;
  status: "Claimed" | "Used" | "Expired";
}

const RewardClaimSchema = new Schema<IRewardClaim>(
  {
    donorId: {
      type: Schema.Types.ObjectId,
      ref: "Donor",
      required: true,
    },
    rewardId: {
      type: Schema.Types.ObjectId,
      ref: "Reward",
      required: true,
    },
    pointsUsed: {
      type: Number,
      required: true,
      min: 0,
    },
    promoCode: {
      type: String,
      required: true,
    },
    claimedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Claimed", "Used", "Expired"],
      default: "Claimed",
    },
  },
  { timestamps: true },
);

export default mongoose.model<IRewardClaim>("RewardClaim", RewardClaimSchema);
