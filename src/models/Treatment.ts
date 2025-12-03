import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface TreatmentAttributes {
  id: number;
  hospitalId: number;
  specialtyId: number;
  name: string;
  slug: string;
  cost: string;
  description?: string;
  duration?: string;
  stay?: string;
  successRate?: number;
  procedureType?: string;
  isPopular?: boolean;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TreatmentCreationAttributes
  extends Optional<
    TreatmentAttributes,
    | "id"
    | "isActive"
    | "isPopular"
    | "description"
    | "duration"
    | "stay"
    | "successRate"
    | "procedureType"
  > {}

class Treatment
  extends Model<TreatmentAttributes, TreatmentCreationAttributes>
  implements TreatmentAttributes
{
  public id!: number;
  public hospitalId!: number;
  public specialtyId!: number;
  public name!: string;
  public slug!: string;
  public cost!: string;
  public description?: string;
  public duration?: string;
  public stay?: string;
  public successRate?: number;
  public procedureType?: string;
  public isPopular!: boolean;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Treatment.init(
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
    },
    cost: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    duration: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    stay: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    successRate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      validate: {
        min: 0,
        max: 100,
      },
    },
    procedureType: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    isPopular: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "treatments",
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
        fields: ["is_popular"],
      },
      {
        fields: ["is_active"],
      },
    ],
  }
);

export default Treatment;
