import express from "express";
import {
  getAllTreatments,
  getTreatmentById,
  createTreatment,
  updateTreatment,
  deleteTreatment,
  getPopularTreatments,
  togglePopularStatus,
} from "../controllers/treatmentController";
import { authenticate, authorize } from "../middleware/auth";

const router = express.Router();

// Public routes
router.get("/", getAllTreatments);
router.get("/popular", getPopularTreatments);
router.get("/:id", getTreatmentById);

// Protected routes - Admin and Hospital Manager
router.post(
  "/",
  authenticate,
  authorize("admin", "hospital_manager"),
  createTreatment
);
router.put(
  "/:id",
  authenticate,
  authorize("admin", "hospital_manager"),
  updateTreatment
);
router.patch(
  "/:id/toggle-popular",
  authenticate,
  authorize("admin"),
  togglePopularStatus
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin", "hospital_manager"),
  deleteTreatment
);

export default router;

