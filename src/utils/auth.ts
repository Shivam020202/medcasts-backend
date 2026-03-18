import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import config from "../config";

// Salt rounds - 12 is a good balance between security and performance
const SALT_ROUNDS = 12;

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId: number, role: string): string => {
  return jwt.sign({ userId, role }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  } as jwt.SignOptions);
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    return null;
  }
};

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password strength validation
export const isStrongPassword = (
  password: string,
): { valid: boolean; message: string } => {
  if (password.length < 8) {
    return {
      valid: false,
      message: "Password must be at least 8 characters long",
    };
  }
  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one uppercase letter",
    };
  }
  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one lowercase letter",
    };
  }
  if (!/[0-9]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one number",
    };
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one special character",
    };
  }
  return { valid: true, message: "Password is strong" };
};

// Generate a secure random string (for JWT secrets, etc.)
export const generateSecureSecret = (length: number = 64): string => {
  return crypto.randomBytes(length).toString("hex");
};

// Sanitize user input - remove potential XSS characters
export const sanitizeInput = (input: string): string => {
  if (typeof input !== "string") return input;
  return input
    .replace(/[<>]/g, "") // Remove angle brackets
    .trim();
};
