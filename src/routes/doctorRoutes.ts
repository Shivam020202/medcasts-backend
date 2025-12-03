import express from "express";
import {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController";
import { authenticate, authorize } from "../middleware/auth";
import { upload } from "../middleware/upload";

const router = express.Router();

// Public routes
router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);

// Protected routes - Admin and Hospital Manager
router.post(
  "/",
  authenticate,
  authorize("admin", "hospital_manager"),
  upload.single("image"),
  createDoctor
);
router.put(
  "/:id",
  authenticate,
  authorize("admin", "hospital_manager"),
  upload.single("image"),
  updateDoctor
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin", "hospital_manager"),
  deleteDoctor
);

export default router;
