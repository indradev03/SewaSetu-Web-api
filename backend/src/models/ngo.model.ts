import mongoose, { Schema, Document } from "mongoose";

export interface INGO extends Document {
  organizationName: string;
  registrationNumber: string;
  yearEstablished: string;
  contactPerson: string;
  email: string;
  password: string;
  impactDescription: string;
  address?: string;
  profileImage?: string;
  isVerified: boolean;
  registrationDocPath?: string;
  panCardPath?: string;
  role: "ngo";
}

const NGOSchema = new Schema<INGO>(
  {
    organizationName: { type: String, required: true, trim: true },
    registrationNumber: { type: String, required: true, unique: true },
    yearEstablished: { type: String, required: true },
    contactPerson: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    impactDescription: { type: String, required: true },
    address: { type: String },
    profileImage: { type: String },
    isVerified: { type: Boolean, default: false },
    registrationDocPath: { type: String },
    panCardPath: { type: String },
    role: { type: String, default: "ngo", immutable: true },
  },
  { timestamps: true },
);

export default mongoose.model<INGO>("NGO", NGOSchema);
