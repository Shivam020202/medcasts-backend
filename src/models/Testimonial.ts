import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface TestimonialAttributes {
  id: number;
  hospitalId: number;
  doctorId?: number;
  patientName: string;
  age?: number;
  country?: string;
  treatment: string;
  rating: number;
  story: string;
  image?: string;
  date?: string;
  isApproved: boolean;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TestimonialCreationAttributes
  extends Optional<
    TestimonialAttributes,
    | "id"
    | "isApproved"
    | "isActive"
    | "doctorId"
    | "age"
    | "country"
    | "image"
    | "date"
  > {}

class Testimonial
  extends Model<TestimonialAttributes, TestimonialCreationAttributes>
  implements TestimonialAttributes
{
  public id!: number;
  public hospitalId!: number;
  public doctorId?: number;
  public patientName!: string;
  public age?: number;
  public country?: string;
  public treatment!: string;
  public rating!: number;
  public story!: string;
  public image?: string;
  public date?: string;
  public isApproved!: boolean;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Testimonial.init(
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
    doctorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: "doctors",
        key: "id",
      },
    },
    patientName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    treatment: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    story: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    date: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    isApproved: {
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
    tableName: "testimonials",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ["hospital_id"],
      },
      {
        fields: ["doctor_id"],
      },
      {
        fields: ["is_approved"],
      },
      {
        fields: ["is_active"],
      },
    ],
  }
);

export default Testimonial;
