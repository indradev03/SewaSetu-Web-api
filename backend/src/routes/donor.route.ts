import { Router } from "express";
import { DonorController } from "../controllers/donor.controller";
import {
  authorizedMiddleware,
  authorizeRoles,
} from "../middleware/auth.middleware";

const router = Router();
const donorController = new DonorController();

/**
 * PUBLIC ROUTES
 */

// Register donor
router.post(
  "/register",
  donorController.registerDonor.bind(donorController)
);

// Login donor
router.post(
  "/login",
  donorController.loginDonor.bind(donorController)
);

/**
 * PROTECTED ROUTES (DONOR ONLY)
 */

// Get own profile
router.get(
  "/profile",
  authorizedMiddleware,
  authorizeRoles("donor"),
  donorController.getProfile.bind(donorController)
);

// Update profile
router.put(
  "/profile",
  authorizedMiddleware,
  authorizeRoles("donor"),
  donorController.updateProfile.bind(donorController)
);

// Delete account
router.delete(
  "/profile",
  authorizedMiddleware,
  authorizeRoles("donor"),
  donorController.deleteAccount.bind(donorController)
);

export default router;