import mongoose from "mongoose";
import { MONGODB_URI } from "../config/constant";

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);

    process.exit(1); // important for production
  }
};

export const connectToMongoDBTest = async () => {
  try {
    const testUri = process.env.MONGODB_TEST_URI || "mongodb://localhost:27017/sewasetu_test";
    await mongoose.connect(testUri);
    console.log("✅ Connected to MongoDB Test Database");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB Test Database:", error);
    process.exit(1);
  }
};