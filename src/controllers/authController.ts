import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth";
import { User } from "../models";
import {
  hashPassword,
  comparePassword,
  generateToken,
  isValidEmail,
  isStrongPassword,
  sanitizeInput,
} from "../utils/auth";
import { AppError } from "../middleware/error";

export const register = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password, name, role, hospitalId } = req.body;

    // Input validation
    if (!email || !password || !name) {
      throw new AppError("Email, password, and name are required", 400);
    }

    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    const sanitizedName = sanitizeInput(name);

    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
      throw new AppError("Invalid email format", 400);
    }

    // Validate password strength
    const passwordCheck = isStrongPassword(password);
    if (!passwordCheck.valid) {
      throw new AppError(passwordCheck.message, 400);
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email: sanitizedEmail },
    });
    if (existingUser) {
      // Generic message to prevent email enumeration
      throw new AppError("Registration failed. Please try again.", 400);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      email: sanitizedEmail,
      password: hashedPassword,
      name: sanitizedName,
      role: role || "hospital_manager",
      hospitalId,
    });

    // Generate token
    const token = generateToken(user.id, user.role);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    // Sanitize email
    const sanitizedEmail = sanitizeInput(email).toLowerCase();

    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
      throw new AppError("Invalid credentials", 401);
    }

    // Find user
    const user = await User.findOne({ where: { email: sanitizedEmail } });
    if (!user) {
      // Use constant-time comparison to prevent timing attacks
      // Even if user doesn't exist, we still "compare" a password
      await comparePassword(password, "$2a$12$invalidhashplaceholder123456");
      throw new AppError("Invalid credentials", 401);
    }

    // Check if user is active
    if (!user.isActive) {
      throw new AppError(
        "Account is deactivated. Please contact support.",
        401,
      );
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new AppError("Invalid credentials", 401);
    }

    // Generate token
    const token = generateToken(user.id, user.role);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          hospitalId: user.hospitalId,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
      include: [
        {
          association: "hospital",
          attributes: ["id", "name", "location"],
        },
      ],
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { name, email } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Sanitize and validate inputs
    const sanitizedName = name ? sanitizeInput(name) : undefined;
    const sanitizedEmail = email
      ? sanitizeInput(email).toLowerCase()
      : undefined;

    // Validate email format if provided
    if (sanitizedEmail && !isValidEmail(sanitizedEmail)) {
      throw new AppError("Invalid email format", 400);
    }

    // Check if email is being changed and if it's already taken
    if (sanitizedEmail && sanitizedEmail !== user.email) {
      const existingUser = await User.findOne({
        where: { email: sanitizedEmail },
      });
      if (existingUser) {
        throw new AppError("Email already in use", 400);
      }
    }

    await user.update({
      name: sanitizedName || user.name,
      email: sanitizedEmail || user.email,
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { currentPassword, newPassword } = req.body;

    // Input validation
    if (!currentPassword || !newPassword) {
      throw new AppError("Current password and new password are required", 400);
    }

    // Validate new password strength
    const passwordCheck = isStrongPassword(newPassword);
    if (!passwordCheck.valid) {
      throw new AppError(passwordCheck.message, 400);
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Verify current password
    const isValidPassword = await comparePassword(
      currentPassword,
      user.password,
    );
    if (!isValidPassword) {
      throw new AppError("Current password is incorrect", 400);
    }

    // Prevent reusing the same password
    const isSamePassword = await comparePassword(newPassword, user.password);
    if (isSamePassword) {
      throw new AppError(
        "New password must be different from current password",
        400,
      );
    }

    // Hash and update new password
    const hashedPassword = await hashPassword(newPassword);
    await user.update({ password: hashedPassword });

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};
