import { Router } from "express";
import { rewardClaimController } from "../../controllers/donor/rewardClaim.controller";
import { authorizedMiddleware, authorizeRoles } from "../../middleware/auth.middleware";

const router = Router();

// All routes require authentication
router.use(authorizedMiddleware);

// Admin route: Get all claims (must be before /:id)
router.get("/admin/all", authorizeRoles("admin"), rewardClaimController.getAllClaims);

// Claim a reward
router.post("/", rewardClaimController.claimReward);

// Get donor's reward claims
router.get("/", rewardClaimController.getDonorClaims);

// Get specific claim by ID
router.get("/:id", rewardClaimController.getClaimById);

// Mark claim as used
router.patch("/:id/use", rewardClaimController.markClaimAsUsed);

export default router;
