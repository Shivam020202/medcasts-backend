import express from "express";
import {
  getAllSpecialties,
  getSpecialtyById,
  getHospitalsBySpecialty,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
} from "../controllers/specialtyController";
import { authenticate, authorize } from "../middleware/auth";
import { upload } from "../middleware/upload";

const router = express.Router();

// Public routes
router.get("/", getAllSpecialties);
router.get("/:slug/hospitals", getHospitalsBySpecialty);
router.get("/:id", getSpecialtyById);

// Protected routes - Admin only
router.post(
  "/",
  authenticate,
  authorize("admin"),
  upload.single("image"),
  createSpecialty
);
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  upload.single("image"),
  updateSpecialty
);
router.delete("/:id", authenticate, authorize("admin"), deleteSpecialty);

export default router;
