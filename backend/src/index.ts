import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import donorRoutes from "./routes/donor.route";
import ngoRoutes from "./routes/ngo.route";
import donationRoutes from "./routes/donation.route";
import adminRoutes from "./routes/admin/admin.route";
import rewardClaimRoutes from "./routes/donor/rewardClaim.route";
import donorRewardsRoutes from "./routes/donor/rewards.route";
import aiRoutes from "./routes/ai.route";
import authRoutes from "./routes/auth.route";
import path from "path";

const app = express();

/**
 * ─────────────────────────────
 * MIDDLEWARES
 * ─────────────────────────────
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      "https://sarojkumarayer.com.np",
    ],
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan("dev"));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/**
 * ─────────────────────────────
 * ROUTES
 * ─────────────────────────────
 */

// Health check
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API is running 🚀",
  });
});

// Donor routes
app.use("/api/v1/donor", donorRoutes);

// Donor reward claim routes
app.use("/api/v1/donor/reward-claims", rewardClaimRoutes);

// Donor rewards routes
app.use("/api/v1/donor/rewards", donorRewardsRoutes);

// NGO routes
app.use("/api/v1/ngo", ngoRoutes);

// Donation routes
app.use("/api/v1/donation", donationRoutes);

// Admin
app.use("/api/v1/admin", adminRoutes);

// AI routes
app.use("/api/v1/ai", aiRoutes);

// Auth routes (forgot password)
app.use("/api/v1/auth", authRoutes);

/**
 * ─────────────────────────────
 * 404 HANDLER
 * ─────────────────────────────
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
