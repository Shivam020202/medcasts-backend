import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface HospitalSpecialtyAttributes {
  id: number;
  hospitalId: number;
  specialtyId: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface HospitalSpecialtyCreationAttributes
  extends Optional<HospitalSpecialtyAttributes, "id" | "isActive"> {}

class HospitalSpecialty
  extends Model<
    HospitalSpecialtyAttributes,
    HospitalSpecialtyCreationAttributes
  >
  implements HospitalSpecialtyAttributes
{
  public id!: number;
  public hospitalId!: number;
  public specialtyId!: number;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

HospitalSpecialty.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    hospitalId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "hospital_id",
      references: {
        model: "hospitals",
        key: "id",
      },
    },
    specialtyId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "specialty_id",
      references: {
        model: "specialties",
        key: "id",
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_active",
    },
  },
  {
    sequelize,
    tableName: "hospital_specialties",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["hospital_id", "specialty_id"],
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

export default HospitalSpecialty;
