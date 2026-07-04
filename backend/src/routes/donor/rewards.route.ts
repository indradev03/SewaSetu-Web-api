import { Router } from "express";
import { authorizedMiddleware } from "../../middleware/auth.middleware";
import { rewardController } from "../../controllers/admin/reward/rewards.controller";

const router = Router();

// All routes require authentication
router.use(authorizedMiddleware);

// Get all rewards (Donor - with filtering support)
router.get("/", rewardController.getRewards);

export default router;
