import { Request, Response, NextFunction } from "express";
import { Doctor, Hospital, Specialty } from "../models";
import { AuthRequest } from "../middleware/auth";
import { AppError } from "../middleware/error";
import { generateUniqueSlug } from "../utils/slug";
import { Op } from "sequelize";

export const getAllDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      hospitalId,
      specialtyId,
      isActive,
    } = req.query;

    const offset = (Number(page) - 1) * Number(limit);
    const whereClause: any = {};

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { specialization: { [Op.like]: `%${search}%` } },
      ];
    }

    if (hospitalId) {
      whereClause.hospitalId = hospitalId;
    }

    if (specialtyId) {
      whereClause.specialtyId = specialtyId;
    }

    if (isActive !== undefined) {
      whereClause.isActive = isActive === "true";
    }

    const { count, rows } = await Doctor.findAndCountAll({
      where: whereClause,
      include: [
        { association: "hospital", attributes: ["id", "name", "location"] },
        { association: "specialty", attributes: ["id", "name"] },
      ],
      limit: Number(limit),
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: {
        doctors: rows,
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

export const getDoctorById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findByPk(id, {
      include: [
        { association: "hospital" },
        { association: "specialty" },
        {
          association: "testimonials",
          where: { isApproved: true, isActive: true },
          required: false,
        },
      ],
    });

    if (!doctor) {
      throw new AppError("Doctor not found", 404);
    }

    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

export const createDoctor = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      hospitalId,
      specialtyId,
      name,
      specialization,
      experience,
      patientsTreated,
      rating,
      reviews,
      qualifications,
      expertise,
      bio,
      email,
      phone,
      consultationFee,
      availableDays,
    } = req.body;

    // Verify hospital exists
    const hospital = await Hospital.findByPk(hospitalId);
    if (!hospital) {
      throw new AppError("Hospital not found", 404);
    }

    // Verify specialty exists
    const specialty = await Specialty.findByPk(specialtyId);
    if (!specialty) {
      throw new AppError("Specialty not found", 404);
    }

    // Generate unique slug
    const slug = await generateUniqueSlug(name, Doctor);

    // Handle image upload
    const image = req.file
      ? `/uploads/${req.body.folder || "general"}/${req.file.filename}`
      : undefined;

    const doctor = await Doctor.create({
      hospitalId,
      specialtyId,
      name,
      slug,
      specialization,
      experience,
      patientsTreated,
      rating: rating || 0,
      reviews,
      image,
      qualifications,
      expertise: expertise
        ? typeof expertise === "string"
          ? JSON.parse(expertise)
          : expertise
        : [],
      bio,
      email,
      phone,
      consultationFee,
      availableDays: availableDays
        ? typeof availableDays === "string"
          ? JSON.parse(availableDays)
          : availableDays
        : [],
    });

    res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDoctor = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const doctor = await Doctor.findByPk(id);
    if (!doctor) {
      throw new AppError("Doctor not found", 404);
    }

    // Update slug if name changed
    if (updateData.name && updateData.name !== doctor.name) {
      updateData.slug = await generateUniqueSlug(updateData.name, Doctor);
    }

    // Handle image upload
    if (req.file) {
      updateData.image = `/uploads/${req.body.folder || "general"}/${
        req.file.filename
      }`;
    }

    // Parse JSON fields if they're strings
    if (updateData.expertise && typeof updateData.expertise === "string") {
      updateData.expertise = JSON.parse(updateData.expertise);
    }
    if (
      updateData.availableDays &&
      typeof updateData.availableDays === "string"
    ) {
      updateData.availableDays = JSON.parse(updateData.availableDays);
    }

    await doctor.update(updateData);

    res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDoctor = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findByPk(id);
    if (!doctor) {
      throw new AppError("Doctor not found", 404);
    }

    // Soft delete
    await doctor.update({ isActive: false });

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
