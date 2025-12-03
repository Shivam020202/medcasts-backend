import { Request, Response, NextFunction } from "express";
import { Testimonial, Hospital, Doctor } from "../models";
import { AuthRequest } from "../middleware/auth";
import { AppError } from "../middleware/error";
import { Op } from "sequelize";

export const getAllTestimonials = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 10,
      hospitalId,
      doctorId,
      isApproved,
      isActive,
    } = req.query;

    const offset = (Number(page) - 1) * Number(limit);
    const whereClause: any = {};

    if (hospitalId) {
      whereClause.hospitalId = hospitalId;
    }

    if (doctorId) {
      whereClause.doctorId = doctorId;
    }

    if (isApproved !== undefined) {
      whereClause.isApproved = isApproved === "true";
    }

    if (isActive !== undefined) {
      whereClause.isActive = isActive === "true";
    }

    const { count, rows } = await Testimonial.findAndCountAll({
      where: whereClause,
      include: [
        { association: "hospital", attributes: ["id", "name"] },
        { association: "doctor", attributes: ["id", "name"], required: false },
      ],
      limit: Number(limit),
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: {
        testimonials: rows,
        pagination: {
          total: count,
          page: Number(page),
          pages: Math.ceil(count / Number(limit)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTestimonialById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findByPk(id, {
      include: [
        { association: "hospital" },
        { association: "doctor", required: false },
      ],
    });

    if (!testimonial) {
      throw new AppError("Testimonial not found", 404);
    }

    res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      hospitalId,
      doctorId,
      patientName,
      age,
      country,
      treatment,
      rating,
      story,
      date,
    } = req.body;

    // Verify hospital exists
    const hospital = await Hospital.findByPk(hospitalId);
    if (!hospital) {
      throw new AppError("Hospital not found", 404);
    }

    // Verify doctor exists if provided
    if (doctorId) {
      const doctor = await Doctor.findByPk(doctorId);
      if (!doctor) {
        throw new AppError("Doctor not found", 404);
      }
    }

    // Handle image upload
    const image = req.file
      ? `/uploads/${req.body.folder || "general"}/${req.file.filename}`
      : undefined;

    const testimonial = await Testimonial.create({
      hospitalId,
      doctorId,
      patientName,
      age,
      country,
      treatment,
      rating,
      story,
      image,
      date,
      isApproved: false, // Needs admin approval
    });

    res.status(201).json({
      success: true,
      message: "Testimonial created successfully and pending approval",
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      throw new AppError("Testimonial not found", 404);
    }

    // Handle image upload
    if (req.file) {
      updateData.image = `/uploads/${req.body.folder || "general"}/${
        req.file.filename
      }`;
    }

    await testimonial.update(updateData);

    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

export const approveTestimonial = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      throw new AppError("Testimonial not found", 404);
    }

    await testimonial.update({ isApproved: true });

    res.status(200).json({
      success: true,
      message: "Testimonial approved successfully",
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      throw new AppError("Testimonial not found", 404);
    }

    // Soft delete
    await testimonial.update({ isActive: false });

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
