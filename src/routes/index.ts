import express from "express";
import authRoutes from "./authRoutes";
import hospitalRoutes from "./hospitalRoutes";
import doctorRoutes from "./doctorRoutes";
import treatmentRoutes from "./treatmentRoutes";
import specialtyRoutes from "./specialtyRoutes";
import testimonialRoutes from "./testimonialRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/hospitals", hospitalRoutes);
router.use("/doctors", doctorRoutes);
router.use("/treatments", treatmentRoutes);
router.use("/specialties", specialtyRoutes);
router.use("/testimonials", testimonialRoutes);

export default router;
