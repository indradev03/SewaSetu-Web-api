import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import donorRoutes from "./routes/donor.route";
import ngoRoutes from "./routes/ngo.route";

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
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));

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

// NGO routes
app.use("/api/v1/ngo", ngoRoutes);

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