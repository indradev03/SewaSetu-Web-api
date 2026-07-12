import { Router } from "express";
import { AIController } from "../controllers/ai.controller";
import { authorizedMiddleware, authorizeRoles } from "../middleware/auth.middleware";
import { uploadAIImage } from "../middleware/upload.middleware";

const router = Router();
const aiController = new AIController();

/**
 * AI ROUTES
 */

// Generate donation item from image
router.post(
  "/generate-item",
  authorizedMiddleware,
  authorizeRoles("donor"),
  uploadAIImage.single("image"),
  aiController.generateDonationItem.bind(aiController),
);

export default router;
