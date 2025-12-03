import sequelize from "../config/database";
import User from "./User";
import Hospital from "./Hospital";
import Specialty from "./Specialty";
import Doctor from "./Doctor";
import Treatment from "./Treatment";
import Testimonial from "./Testimonial";
import HospitalSpecialty from "./HospitalSpecialty";

// Define relationships

// Hospital-Specialty many-to-many relationship
Hospital.belongsToMany(Specialty, {
  through: HospitalSpecialty,
  foreignKey: "hospitalId",
  otherKey: "specialtyId",
  as: "specialties",
});
Specialty.belongsToMany(Hospital, {
  through: HospitalSpecialty,
  foreignKey: "specialtyId",
  otherKey: "hospitalId",
  as: "hospitals",
});

// HospitalSpecialty direct associations (for querying junction table)
HospitalSpecialty.belongsTo(Hospital, {
  foreignKey: "hospitalId",
  as: "hospital",
});
HospitalSpecialty.belongsTo(Specialty, {
  foreignKey: "specialtyId",
  as: "specialty",
});

// Hospital relationships
Hospital.hasMany(Doctor, { foreignKey: "hospitalId", as: "doctors" });
Hospital.hasMany(Treatment, { foreignKey: "hospitalId", as: "treatments" });
Hospital.hasMany(Testimonial, { foreignKey: "hospitalId", as: "testimonials" });
Hospital.hasMany(User, { foreignKey: "hospitalId", as: "users" });

// Specialty relationships
Specialty.hasMany(Doctor, { foreignKey: "specialtyId", as: "doctors" });
Specialty.hasMany(Treatment, { foreignKey: "specialtyId", as: "treatments" });

// Doctor relationships
Doctor.belongsTo(Hospital, { foreignKey: "hospitalId", as: "hospital" });
Doctor.belongsTo(Specialty, { foreignKey: "specialtyId", as: "specialty" });
Doctor.hasMany(Testimonial, { foreignKey: "doctorId", as: "testimonials" });

// Treatment relationships
Treatment.belongsTo(Hospital, { foreignKey: "hospitalId", as: "hospital" });
Treatment.belongsTo(Specialty, { foreignKey: "specialtyId", as: "specialty" });

// Testimonial relationships
Testimonial.belongsTo(Hospital, { foreignKey: "hospitalId", as: "hospital" });
Testimonial.belongsTo(Doctor, { foreignKey: "doctorId", as: "doctor" });

// User relationships
User.belongsTo(Hospital, { foreignKey: "hospitalId", as: "hospital" });

export {
  sequelize,
  User,
  Hospital,
  Specialty,
  Doctor,
  Treatment,
  Testimonial,
  HospitalSpecialty,
};
