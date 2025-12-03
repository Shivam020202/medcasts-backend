import { Request, Response, NextFunction } from "express";
import {
  Hospital,
  Specialty,
  HospitalSpecialty,
  Doctor,
  Treatment,
  Testimonial,
} from "../models";
import { AuthRequest } from "../middleware/auth";
import { AppError } from "../middleware/error";
import { Op } from "sequelize";

// Add specialties to a hospital
export const addHospitalSpecialties = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { specialtyIds } = req.body;

    if (!Array.isArray(specialtyIds) || specialtyIds.length === 0) {
      throw new AppError("specialtyIds must be a non-empty array", 400);
    }

    const hospital = await Hospital.findByPk(id);
    if (!hospital) {
      throw new AppError("Hospital not found", 404);
    }

    // Verify all specialties exist
    const specialties = await Specialty.findAll({
      where: { id: { [Op.in]: specialtyIds } },
    });

    if (specialties.length !== specialtyIds.length) {
      throw new AppError("One or more specialty IDs are invalid", 400);
    }

    // Add specialties (this will create records in hospital_specialties junction table)
    await (hospital as any).addSpecialties(specialtyIds);

    res.status(200).json({
      success: true,
      message: "Specialties added to hospital successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Get all specialties for a hospital
export const getHospitalSpecialties = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const hospital = await Hospital.findByPk(id, {
      include: [
        {
          association: "specialties",
          through: { attributes: ["isActive", "createdAt"] },
          where: { isActive: true },
          required: false,
        },
      ],
    });

    if (!hospital) {
      throw new AppError("Hospital not found", 404);
    }

    res.status(200).json({
      success: true,
      data: (hospital as any).specialties || [],
    });
  } catch (error) {
    next(error);
  }
};

// Remove a specialty from a hospital
export const removeHospitalSpecialty = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, specialtyId } = req.params;

    const hospital = await Hospital.findByPk(id);
    if (!hospital) {
      throw new AppError("Hospital not found", 404);
    }

    const specialty = await Specialty.findByPk(specialtyId);
    if (!specialty) {
      throw new AppError("Specialty not found", 404);
    }

    // Remove the association
    await (hospital as any).removeSpecialty(specialtyId);

    res.status(200).json({
      success: true,
      message: "Specialty removed from hospital successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Get hospital-specialty page data (for frontend)
export const getHospitalSpecialtyData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { hospitalSlug, specialtySlug } = req.params;

    // Find hospital by slug
    const hospital = await Hospital.findOne({
      where: { slug: hospitalSlug, isActive: true },
      include: [
        {
          association: "specialties",
          where: { slug: specialtySlug, isActive: true },
          through: { attributes: [] },
          required: true,
        },
      ],
    });

    if (!hospital) {
      throw new AppError(
        "Hospital-Specialty combination not found or not active",
        404
      );
    }

    const specialties = (hospital as any).specialties || [];
    if (specialties.length === 0) {
      throw new AppError("Specialty not assigned to this hospital", 404);
    }

    const specialty = specialties[0];

    // Fetch doctors for this hospital and specialty
    const doctors = await Doctor.findAll({
      where: {
        hospitalId: hospital.id,
        specialtyId: specialty.id,
        isActive: true,
      },
      include: [
        { association: "hospital", attributes: ["id", "name", "slug"] },
        { association: "specialty", attributes: ["id", "name", "slug"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Fetch treatments for this hospital and specialty
    const treatments = await Treatment.findAll({
      where: {
        hospitalId: hospital.id,
        specialtyId: specialty.id,
        isActive: true,
      },
      include: [
        { association: "hospital", attributes: ["id", "name", "slug"] },
        { association: "specialty", attributes: ["id", "name", "slug"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Fetch testimonials for this hospital
    const testimonials = await Testimonial.findAll({
      where: {
        hospitalId: hospital.id,
        isApproved: true,
        isActive: true,
      },
      include: [
        {
          association: "doctor",
          where: { specialtyId: specialty.id },
          required: false,
          attributes: ["id", "name", "specialization"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 10,
    });

    res.status(200).json({
      success: true,
      data: {
        hospital: {
          id: hospital.id,
          name: hospital.name,
          slug: hospital.slug,
          location: hospital.location,
          city: hospital.city,
          state: hospital.state,
          country: hospital.country,
          rating: hospital.rating,
          description: hospital.description,
          image: hospital.image,
          accreditation: hospital.accreditation,
          address: hospital.address,
          phone: hospital.phone,
          email: hospital.email,
          website: hospital.website,
          establishedYear: hospital.establishedYear,
          bedCapacity: hospital.bedCapacity,
          mapEmbedUrl: hospital.mapEmbedUrl,
          airportDistance: hospital.airportDistance,
        },
        specialty: {
          id: specialty.id,
          name: specialty.name,
          slug: specialty.slug,
          description: specialty.description,
          icon: specialty.icon,
          imageUrl: specialty.imageUrl,
        },
        doctors,
        treatments,
        testimonials,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all hospital-specialty combinations (for navigation/listing)
export const getAllHospitalSpecialties = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const hospitalSpecialties = await HospitalSpecialty.findAll({
      where: { isActive: true },
      include: [
        {
          model: Hospital,
          as: "hospital",
          where: { isActive: true },
          attributes: ["id", "name", "slug", "location", "city", "image"],
        },
        {
          model: Specialty,
          as: "specialty",
          where: { isActive: true },
          attributes: ["id", "name", "slug", "icon", "imageUrl"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: hospitalSpecialties,
    });
  } catch (error) {
    next(error);
  }
};
