import { Request, Response, NextFunction } from "express";
import { Specialty, Hospital, Treatment, HospitalSpecialty } from "../models";
import { AuthRequest } from "../middleware/auth";
import { AppError } from "../middleware/error";
import { generateUniqueSlug } from "../utils/slug";
import { Op } from "sequelize";

export const getAllSpecialties = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { page = 1, limit = 50, search, isActive } = req.query;

    const offset = (Number(page) - 1) * Number(limit);
    const whereClause: any = {};

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    if (isActive !== undefined) {
      whereClause.isActive = isActive === "true";
    }

    const { count, rows } = await Specialty.findAndCountAll({
      where: whereClause,
      limit: Number(limit),
      offset,
      order: [["name", "ASC"]],
    });

    res.status(200).json({
      success: true,
      data: {
        specialties: rows,
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

export const getSpecialtyById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const specialty = await Specialty.findByPk(id, {
      include: [
        { association: "doctors", where: { isActive: true }, required: false },
        {
          association: "treatments",
          where: { isActive: true },
          required: false,
        },
      ],
    });

    if (!specialty) {
      throw new AppError("Specialty not found", 404);
    }

    res.status(200).json({
      success: true,
      data: specialty,
    });
  } catch (error) {
    next(error);
  }
};

export const createSpecialty = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      name,
      description,
      icon,
      clinicsCount,
      bgColor,
      iconBg,
      iconColor,
    } = req.body;

    // Generate unique slug
    const slug = await generateUniqueSlug(name, Specialty);

    // Handle image upload
    const imageUrl = req.file
      ? `/uploads/${req.body.folder || "general"}/${req.file.filename}`
      : undefined;

    const specialty = await Specialty.create({
      name,
      slug,
      description,
      icon,
      clinicsCount,
      bgColor,
      iconBg,
      iconColor,
      imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Specialty created successfully",
      data: specialty,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSpecialty = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const specialty = await Specialty.findByPk(id);
    if (!specialty) {
      throw new AppError("Specialty not found", 404);
    }

    // Update slug if name changed
    if (updateData.name && updateData.name !== specialty.name) {
      updateData.slug = await generateUniqueSlug(updateData.name, Specialty);
    }

    // Handle image upload
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.body.folder || "general"}/${
        req.file.filename
      }`;
    }

    await specialty.update(updateData);

    res.status(200).json({
      success: true,
      message: "Specialty updated successfully",
      data: specialty,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSpecialty = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const specialty = await Specialty.findByPk(id);
    if (!specialty) {
      throw new AppError("Specialty not found", 404);
    }

    // Soft delete
    await specialty.update({ isActive: false });

    res.status(200).json({
      success: true,
      message: "Specialty deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getHospitalsBySpecialty = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;

    // Find specialty by slug
    const specialty = await Specialty.findOne({
      where: { slug, isActive: true },
    });

    if (!specialty) {
      throw new AppError("Specialty not found", 404);
    }

    // Find all hospitals offering this specialty
    const hospitals = await Hospital.findAll({
      include: [
        {
          model: Specialty,
          as: "specialties",
          where: { id: specialty.id },
          through: {
            where: { isActive: true },
            attributes: [],
          },
          attributes: [],
        },
        {
          model: Treatment,
          as: "treatments",
          where: { specialtyId: specialty.id, isActive: true },
          required: false,
          attributes: [
            "id",
            "name",
            "slug",
            "cost",
            "description",
            "duration",
            "stay",
            "successRate",
            "procedureType",
            "isPopular",
          ],
        },
      ],
      where: { isActive: true },
      order: [
        ["rating", "DESC"],
        ["name", "ASC"],
      ],
    });

    res.status(200).json({
      success: true,
      data: {
        specialty,
        hospitals,
        count: hospitals.length,
      },
    });
  } catch (error) {
    next(error);
  }
};
