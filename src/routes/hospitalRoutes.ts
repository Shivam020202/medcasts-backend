import express from "express";
import {
  getAllHospitals,
  getHospitalById,
  getHospitalBySlug,
  createHospital,
  updateHospital,
  deleteHospital,
} from "../controllers/hospitalController";
import {
  addHospitalSpecialties,
  getHospitalSpecialties,
  removeHospitalSpecialty,
  getHospitalSpecialtyData,
  getAllHospitalSpecialties,
} from "../controllers/hospitalSpecialtyController";
import { authenticate, authorize } from "../middleware/auth";
import { upload } from "../middleware/upload";

const router = express.Router();

// Public routes
router.get("/", getAllHospitals);
router.get("/specialty-combinations", getAllHospitalSpecialties);
router.get("/:id", getHospitalById);
router.get("/slug/:slug", getHospitalBySlug);
router.get("/:id/specialties", getHospitalSpecialties);
router.get("/:hospitalSlug/:specialtySlug", getHospitalSpecialtyData);

// Protected routes - Admin only
router.post(
  "/",
  authenticate,
  authorize("admin"),
  upload.single("image"),
  createHospital
);
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  upload.single("image"),
  updateHospital
);
router.delete("/:id", authenticate, authorize("admin"), deleteHospital);
router.post(
  "/:id/specialties",
  authenticate,
  authorize("admin"),
  addHospitalSpecialties
);
router.delete(
  "/:id/specialties/:specialtyId",
  authenticate,
  authorize("admin"),
  removeHospitalSpecialty
);

export default router;
