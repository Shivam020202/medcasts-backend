import express from "express";
import rateLimit from "express-rate-limit";
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/authController";
import { authenticate } from "../middleware/auth";

const router = express.Router();

// Strict rate limiting for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: {
    success: false,
    message: "Too many login attempts, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Only count failed attempts
});

// Even stricter limiter for registration
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 registrations per hour per IP
  message: {
    success: false,
    message: "Too many registration attempts, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public routes with rate limiting
router.post("/register", registerLimiter, register);
router.post("/login", authLimiter, login);

// Protected routes
router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);
router.put("/change-password", authenticate, changePassword);

export default router;
