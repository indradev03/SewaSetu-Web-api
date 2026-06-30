import { Router } from "express";
import {
  authorizedMiddleware,
  authorizeRoles,
} from "../../middleware/auth.middleware";
import { AdminController } from "../../controllers/admin/admin.controller";
import rewardRoutes from "../admin/rewards/rewards.route";

const router = Router();
const admin = new AdminController();

// GLOBAL ADMIN PROTECTION
router.use(authorizedMiddleware);
router.use(authorizeRoles("admin"));

// DASHBOARD
router.get("/dashboard", admin.dashboard.bind(admin));

// DONORS
router.get("/donors", admin.getAllDonors.bind(admin));
router.get("/donors/:id", admin.getDonorById.bind(admin));
router.delete("/donors/:id", admin.deleteDonor.bind(admin));

// NGOs
router.get("/ngos", admin.getAllNGOs.bind(admin));
router.get("/ngos/:id", admin.getNGOById.bind(admin));
router.delete("/ngos/:id", admin.deleteNGO.bind(admin));

// REWARDS
router.use("/rewards", rewardRoutes);

export default router;
