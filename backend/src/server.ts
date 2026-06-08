import dotenv from "dotenv";
dotenv.config(); // MUST BE FIRST

import app from "./index";
import { connectToMongoDB } from "./database/mongodb";

const PORT = process.env.PORT || 8088;

const startServer = async () => {
  try {
    await connectToMongoDB();

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
};

startServer();