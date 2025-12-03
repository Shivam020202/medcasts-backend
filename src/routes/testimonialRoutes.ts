import express from "express";
import {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  approveTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController";
import { authenticate, authorize } from "../middleware/auth";
import { upload } from "../middleware/upload";

const router = express.Router();

// Public routes
router.get("/", getAllTestimonials);
router.get("/:id", getTestimonialById);

// Protected routes
router.post("/", authenticate, upload.single("image"), createTestimonial);
router.put(
  "/:id",
  authenticate,
  authorize("admin", "hospital_manager"),
  upload.single("image"),
  updateTestimonial
);
router.patch(
  "/:id/approve",
  authenticate,
  authorize("admin"),
  approveTestimonial
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin", "hospital_manager"),
  deleteTestimonial
);

export default router;
