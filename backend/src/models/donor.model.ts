import mongoose, { Schema, Document } from "mongoose";

export interface IDonor extends Document {
  username: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender?: "male" | "female" | "other";
  address?: string;
  role: "donor" | "admin";
}

const DonorSchema = new Schema<IDonor>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"] },
    address: { type: String },
    role: { type: String, enum: ["donor", "admin"], default: "donor" },
  },
  { timestamps: true }
);

export default mongoose.model<IDonor>("Donor", DonorSchema);