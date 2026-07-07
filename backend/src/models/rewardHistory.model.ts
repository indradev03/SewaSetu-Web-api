import mongoose, { Schema, Document } from "mongoose";

export interface IRewardHistory extends Document {
  donorId: mongoose.Types.ObjectId;
  donationId: mongoose.Types.ObjectId;
  ngoId?: mongoose.Types.ObjectId;
  pointsAwarded: number;
  reason: string;
  createdAt: Date;
}

const RewardHistorySchema = new Schema<IRewardHistory>(
  {
    donorId: {
      type: Schema.Types.ObjectId,
      ref: "Donor",
      required: true,
    },
    donationId: {
      type: Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
    },
    ngoId: {
      type: Schema.Types.ObjectId,
      ref: "NGO",
    },
    pointsAwarded: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IRewardHistory>("RewardHistory", RewardHistorySchema);
