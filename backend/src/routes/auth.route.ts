import { Router } from "express";
import authController from "../controllers/auth.controller";

const router = Router();

// ── Donor Forgot Password Routes
router.post("/donor/forgot-password", authController.forgotPasswordDonor);
router.post("/donor/verify-reset-code", authController.verifyResetCodeDonor);
router.post("/donor/reset-password", authController.resetPasswordDonor);

// ── NGO Forgot Password Routes
router.post("/ngo/forgot-password", authController.forgotPasswordNGO);
router.post("/ngo/verify-reset-code", authController.verifyResetCodeNGO);
router.post("/ngo/reset-password", authController.resetPasswordNGO);

export default router;
