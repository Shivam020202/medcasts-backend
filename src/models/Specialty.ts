import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface SpecialtyAttributes {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  clinicsCount?: number;
  bgColor?: string;
  iconBg?: string;
  iconColor?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface SpecialtyCreationAttributes
  extends Optional<
    SpecialtyAttributes,
    | "id"
    | "isActive"
    | "description"
    | "icon"
    | "clinicsCount"
    | "bgColor"
    | "iconBg"
    | "iconColor"
    | "imageUrl"
  > {}

class Specialty
  extends Model<SpecialtyAttributes, SpecialtyCreationAttributes>
  implements SpecialtyAttributes
{
  public id!: number;
  public name!: string;
  public slug!: string;
  public description?: string;
  public icon?: string;
  public clinicsCount?: number;
  public bgColor?: string;
  public iconBg?: string;
  public iconColor?: string;
  public imageUrl?: string;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Specialty.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    icon: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    clinicsCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    bgColor: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    iconBg: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    iconColor: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "specialties",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ["slug"],
      },
      {
        fields: ["is_active"],
      },
    ],
  }
);

export default Specialty;
