import { Router } from "express";
import { NGOController } from "../controllers/ngo.controller";
import {
  authorizedMiddleware,
  authorizeRoles,
} from "../middleware/auth.middleware";
import {
  uploadNgoProfile,
  uploadNgoDocuments,
} from "../middleware/upload.middleware";

const router = Router();
const ngoController = new NGOController();

/**
 * PUBLIC ROUTES
 */

// Register NGO (with document uploads)
router.post(
  "/register",
  uploadNgoDocuments.fields([
    { name: "registrationDoc", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
  ]),
  ngoController.registerNGO.bind(ngoController),
);

// Login NGO
router.post("/login", ngoController.loginNGO.bind(ngoController));

/**
 * PUBLIC / GENERAL
 */

// Get all verified NGOs (public listing)
router.get("/verified", ngoController.getVerifiedNGOs.bind(ngoController));

/**
 * PROTECTED ROUTES (NGO ONLY)
 */

// Get NGO profile
router.get(
  "/profile",
  authorizedMiddleware,
  authorizeRoles("ngo"),
  ngoController.getProfile.bind(ngoController),
);

// Update NGO profile
router.put(
  "/profile",
  authorizedMiddleware,
  authorizeRoles("ngo"),
  uploadNgoProfile.single("image"), // uplaod profile
  ngoController.updateProfile.bind(ngoController),
);

// Remove NGO profile image
router.delete(
  "/profile/image",
  authorizedMiddleware,
  authorizeRoles("ngo"),
  ngoController.removeProfileImage.bind(ngoController),
);

// Change NGO password
router.put(
  "/profile/change-password",
  authorizedMiddleware,
  authorizeRoles("ngo"),
  ngoController.changePassword.bind(ngoController),
);

/**
 * ADMIN ONLY ROUTES
 */

// Verify NGO (admin approval)
router.patch(
  "/verify/:id",
  authorizedMiddleware,
  authorizeRoles("admin"),
  ngoController.verifyNGO.bind(ngoController),
);

// Delete NGO (admin only)
router.delete(
  "/:id",
  authorizedMiddleware,
  authorizeRoles("admin"),
  ngoController.deleteNGO.bind(ngoController),
);

export default router;
