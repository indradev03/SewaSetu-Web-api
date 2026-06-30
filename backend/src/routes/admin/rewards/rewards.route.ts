import { Router } from "express";
import {
  authorizedMiddleware,
  authorizeRoles,
} from "../../../middleware/auth.middleware";
import { rewardController } from "../../../controllers/admin/reward/rewards.controller";
import { uploadRewardImage } from "../../../middleware/upload.middleware";

const router = Router();

// All reward routes require admin authentication
router.use(authorizedMiddleware);
router.use(authorizeRoles("admin"));

// Create reward
router.post(
  "/",
  uploadRewardImage.single("image"),
  rewardController.createReward,
);

// Get all rewards (Admin)
router.get("/", rewardController.getRewards);

// Get active rewards
router.get("/active", rewardController.getActiveRewards);

// Get reward by ID
router.get("/:id", rewardController.getRewardById);

// Update reward
router.put(
  "/:id",
  uploadRewardImage.single("image"),
  rewardController.updateReward,
);

// Toggle reward status
router.patch("/:id/toggle-status", rewardController.toggleStatus);

// Delete reward
router.delete("/:id", rewardController.deleteReward);

export default router;
