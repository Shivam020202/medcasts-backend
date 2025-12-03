import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface DoctorAttributes {
  id: number;
  hospitalId: number;
  specialtyId: number;
  name: string;
  slug: string;
  specialization: string;
  experience: string;
  patientsTreated?: string;
  rating: number;
  reviews?: string;
  image?: string;
  qualifications?: string;
  expertise?: string; // JSON array
  bio?: string;
  email?: string;
  phone?: string;
  consultationFee?: number;
  availableDays?: string; // JSON array
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface DoctorCreationAttributes
  extends Optional<
    DoctorAttributes,
    | "id"
    | "isActive"
    | "patientsTreated"
    | "reviews"
    | "image"
    | "qualifications"
    | "expertise"
    | "bio"
    | "email"
    | "phone"
    | "consultationFee"
    | "availableDays"
  > {}

class Doctor
  extends Model<DoctorAttributes, DoctorCreationAttributes>
  implements DoctorAttributes
{
  public id!: number;
  public hospitalId!: number;
  public specialtyId!: number;
  public name!: string;
  public slug!: string;
  public specialization!: string;
  public experience!: string;
  public patientsTreated?: string;
  public rating!: number;
  public reviews?: string;
  public image?: string;
  public qualifications?: string;
  public expertise?: string;
  public bio?: string;
  public email?: string;
  public phone?: string;
  public consultationFee?: number;
  public availableDays?: string;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Doctor.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    hospitalId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "hospitals",
        key: "id",
      },
    },
    specialtyId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "specialties",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    specialization: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    experience: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    patientsTreated: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        min: 0,
        max: 5,
      },
    },
    reviews: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    qualifications: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    expertise: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("expertise");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value: string[]) {
        this.setDataValue("expertise", JSON.stringify(value) as any);
      },
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    consultationFee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    availableDays: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("availableDays");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value: string[]) {
        this.setDataValue("availableDays", JSON.stringify(value) as any);
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "doctors",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ["slug"],
      },
      {
        fields: ["hospital_id"],
      },
      {
        fields: ["specialty_id"],
      },
      {
        fields: ["is_active"],
      },
    ],
  }
);

export default Doctor;
