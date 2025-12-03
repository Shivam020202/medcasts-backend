import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface HospitalAttributes {
  id: number;
  name: string;
  slug: string;
  location: string;
  city: string;
  state: string;
  country: string;
  rating: number;
  specialty: string;
  description?: string;
  image?: string;
  accreditation?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  establishedYear?: number;
  bedCapacity?: number;
  mapEmbedUrl?: string;
  airportDistance?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface HospitalCreationAttributes
  extends Optional<
    HospitalAttributes,
    | "id"
    | "isActive"
    | "description"
    | "image"
    | "accreditation"
    | "address"
    | "phone"
    | "email"
    | "website"
    | "establishedYear"
    | "bedCapacity"
    | "mapEmbedUrl"
    | "airportDistance"
  > {}

class Hospital
  extends Model<HospitalAttributes, HospitalCreationAttributes>
  implements HospitalAttributes
{
  public id!: number;
  public name!: string;
  public slug!: string;
  public location!: string;
  public city!: string;
  public state!: string;
  public country!: string;
  public rating!: number;
  public specialty!: string;
  public description?: string;
  public image?: string;
  public accreditation?: string;
  public address?: string;
  public phone?: string;
  public email?: string;
  public website?: string;
  public establishedYear?: number;
  public bedCapacity?: number;
  public mapEmbedUrl?: string;
  public airportDistance?: string;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Hospital.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
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
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "India",
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
    specialty: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    accreditation: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    website: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    establishedYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bedCapacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mapEmbedUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    airportDistance: {
      type: DataTypes.STRING(100),
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
    tableName: "hospitals",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ["slug"],
      },
      {
        fields: ["city"],
      },
      {
        fields: ["is_active"],
      },
    ],
  }
);

export default Hospital;
