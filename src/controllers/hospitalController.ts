import { Request, Response, NextFunction } from "express";
import { Hospital, Doctor, Treatment, Testimonial } from "../models";
import { AuthRequest } from "../middleware/auth";
import { AppError } from "../middleware/error";
import { generateUniqueSlug } from "../utils/slug";
import { Op } from "sequelize";

export const getAllHospitals = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { page = 1, limit = 10, search, city, isActive } = req.query;

    const offset = (Number(page) - 1) * Number(limit);
    const whereClause: any = {};

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { location: { [Op.like]: `%${search}%` } },
        { specialty: { [Op.like]: `%${search}%` } },
      ];
    }

    if (city) {
      whereClause.city = city;
    }

    if (isActive !== undefined) {
      whereClause.isActive = isActive === "true";
    }

    const { count, rows } = await Hospital.findAndCountAll({
      where: whereClause,
      limit: Number(limit),
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: {
        hospitals: rows,
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

export const getHospitalById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const hospital = await Hospital.findByPk(id, {
      include: [
        { association: "doctors", where: { isActive: true }, required: false },
        {
          association: "treatments",
          where: { isActive: true },
          required: false,
        },
        {
          association: "testimonials",
          where: { isApproved: true, isActive: true },
          required: false,
        },
      ],
    });

    if (!hospital) {
      throw new AppError("Hospital not found", 404);
    }

    res.status(200).json({
      success: true,
      data: hospital,
    });
  } catch (error) {
    next(error);
  }
};

export const getHospitalBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;

    const hospital = await Hospital.findOne({
      where: { slug, isActive: true },
      include: [
        { association: "doctors", where: { isActive: true }, required: false },
        {
          association: "treatments",
          where: { isActive: true },
          required: false,
        },
        {
          association: "testimonials",
          where: { isApproved: true, isActive: true },
          required: false,
        },
      ],
    });

    if (!hospital) {
      throw new AppError("Hospital not found", 404);
    }

    res.status(200).json({
      success: true,
      data: hospital,
    });
  } catch (error) {
    next(error);
  }
};

export const createHospital = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      name,
      location,
      city,
      state,
      country,
      rating,
      specialty,
      description,
      accreditation,
      address,
      phone,
      email,
      website,
      establishedYear,
      bedCapacity,
    } = req.body;

    // Generate unique slug
    const slug = await generateUniqueSlug(name, Hospital);

    // Handle image upload
    const image = req.file
      ? `/uploads/${req.body.folder || "general"}/${req.file.filename}`
      : undefined;

    const hospital = await Hospital.create({
      name,
      slug,
      location,
      city,
      state,
      country: country || "India",
      rating: rating || 0,
      specialty,
      description,
      image,
      accreditation,
      address,
      phone,
      email,
      website,
      establishedYear,
      bedCapacity,
    });

    res.status(201).json({
      success: true,
      message: "Hospital created successfully",
      data: hospital,
    });
  } catch (error) {
    next(error);
  }
};

export const updateHospital = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const hospital = await Hospital.findByPk(id);
    if (!hospital) {
      throw new AppError("Hospital not found", 404);
    }

    // Update slug if name changed
    if (updateData.name && updateData.name !== hospital.name) {
      updateData.slug = await generateUniqueSlug(updateData.name, Hospital);
    }

    // Handle image upload
    if (req.file) {
      updateData.image = `/uploads/${req.body.folder || "general"}/${
        req.file.filename
      }`;
    }

    await hospital.update(updateData);

    res.status(200).json({
      success: true,
      message: "Hospital updated successfully",
      data: hospital,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteHospital = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const hospital = await Hospital.findByPk(id);
    if (!hospital) {
      throw new AppError("Hospital not found", 404);
    }

    // Soft delete
    await hospital.update({ isActive: false });

    res.status(200).json({
      success: true,
      message: "Hospital deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
