import { Request, Response, NextFunction } from "express";
import { Treatment, Hospital, Specialty } from "../models";
import { AuthRequest } from "../middleware/auth";
import { AppError } from "../middleware/error";
import { generateUniqueSlug } from "../utils/slug";
import { Op } from "sequelize";

export const getAllTreatments = async (
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
        { description: { [Op.like]: `%${search}%` } },
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

    const { count, rows } = await Treatment.findAndCountAll({
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
        treatments: rows,
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

export const getTreatmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const treatment = await Treatment.findByPk(id, {
      include: [{ association: "hospital" }, { association: "specialty" }],
    });

    if (!treatment) {
      throw new AppError("Treatment not found", 404);
    }

    res.status(200).json({
      success: true,
      data: treatment,
    });
  } catch (error) {
    next(error);
  }
};

export const createTreatment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      hospitalId,
      specialtyId,
      name,
      cost,
      description,
      duration,
      stay,
      successRate,
      procedureType,
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
    const slug = await generateUniqueSlug(name, Treatment);

    const treatment = await Treatment.create({
      hospitalId,
      specialtyId,
      name,
      slug,
      cost,
      description,
      duration,
      stay,
      successRate,
      procedureType,
    });

    res.status(201).json({
      success: true,
      message: "Treatment created successfully",
      data: treatment,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTreatment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const treatment = await Treatment.findByPk(id);
    if (!treatment) {
      throw new AppError("Treatment not found", 404);
    }

    // Update slug if name changed
    if (updateData.name && updateData.name !== treatment.name) {
      updateData.slug = await generateUniqueSlug(updateData.name, Treatment);
    }

    await treatment.update(updateData);

    res.status(200).json({
      success: true,
      message: "Treatment updated successfully",
      data: treatment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTreatment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const treatment = await Treatment.findByPk(id);
    if (!treatment) {
      throw new AppError("Treatment not found", 404);
    }

    // Soft delete
    await treatment.update({ isActive: false });

    res.status(200).json({
      success: true,
      message: "Treatment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getPopularTreatments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const treatments = await Treatment.findAll({
      where: {
        isActive: true,
        isPopular: true,
      },
      include: [
        { association: "hospital", attributes: ["id", "name", "location"] },
        { association: "specialty", attributes: ["id", "name", "slug"] },
      ],
      order: [["createdAt", "DESC"]],
      limit: 3,
    });

    res.status(200).json({
      success: true,
      data: treatments,
    });
  } catch (error) {
    next(error);
  }
};

export const togglePopularStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const treatment = await Treatment.findByPk(id);
    if (!treatment) {
      throw new AppError("Treatment not found", 404);
    }

    // If trying to mark as popular, check if we already have 3 popular treatments
    if (!treatment.isPopular) {
      const popularCount = await Treatment.count({
        where: {
          isPopular: true,
          isActive: true,
        },
      });

      if (popularCount >= 3) {
        throw new AppError(
          "Maximum of 3 treatments can be marked as popular. Please unmark another treatment first.",
          400
        );
      }
    }

    // Toggle the popular status
    await treatment.update({ isPopular: !treatment.isPopular });

    res.status(200).json({
      success: true,
      message: `Treatment ${treatment.isPopular ? "marked as" : "unmarked from"} popular successfully`,
      data: treatment,
    });
  } catch (error) {
    next(error);
  }
};

