import mongoose, { Schema, Document } from "mongoose";

export interface IDonation extends Document {
  donorId: mongoose.Types.ObjectId;
  category: "Food" | "Clothes" | "Others";
  title: string;
  description: string;
  quantity: number;
  unit: "Pieces" | "Kgs" | "Packets" | "Liters";
  photos: string[];
  pickupAddress: string;
  // Admin approval status
  adminStatus: "Pending" | "Approved" | "Rejected";
  adminRejectionReason?: string;
  // NGO claim fields
  claimedBy?: mongoose.Types.ObjectId;
  claimStatus: "Unclaimed" | "Claimed" | "Completed";
  claimedAt?: Date;
  estimatedPickupTime?: Date;
  pointsEarned?: number;
}

const DonationSchema = new Schema<IDonation>(
  {
    donorId: {
      type: Schema.Types.ObjectId,
      ref: "Donor",
      required: true,
    },
    category: {
      type: String,
      enum: ["Food", "Clothes", "Others"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 200,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unit: {
      type: String,
      enum: ["Pieces", "Kgs", "Packets", "Liters"],
      required: true,
    },
    photos: [
      {
        type: String,
        default: [],
      },
    ],
    pickupAddress: {
      type: String,
      required: true,
    },
    // Admin approval status
    adminStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    adminRejectionReason: {
      type: String,
    },
    // NGO claim fields
    claimedBy: {
      type: Schema.Types.ObjectId,
      ref: "NGO",
    },
    claimStatus: {
      type: String,
      enum: ["Unclaimed", "Claimed", "Completed"],
      default: "Unclaimed",
    },
    claimedAt: {
      type: Date,
    },
    estimatedPickupTime: {
      type: Date,
    },
    pointsEarned: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IDonation>("Donation", DonationSchema);
