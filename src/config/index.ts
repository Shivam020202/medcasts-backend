import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

// Generate a secure random secret if not provided
const generateSecureSecret = (): string => {
  return crypto.randomBytes(64).toString("hex");
};

// Check for insecure configurations
const validateSecurityConfig = () => {
  const warnings: string[] = [];

  if (
    !process.env.JWT_SECRET ||
    process.env.JWT_SECRET === "default_secret_change_me"
  ) {
    warnings.push(
      "⚠️  WARNING: JWT_SECRET is not set or using default value. This is insecure for production!",
    );
  }

  if (
    !process.env.ADMIN_PASSWORD ||
    process.env.ADMIN_PASSWORD === "Admin@123"
  ) {
    warnings.push(
      "⚠️  WARNING: ADMIN_PASSWORD is using default value. Change it immediately!",
    );
  }

  if (process.env.NODE_ENV === "production") {
    if (warnings.length > 0) {
      console.error("\n" + "=".repeat(70));
      console.error("🔒 SECURITY WARNINGS:");
      warnings.forEach((w) => console.error(w));
      console.error("=".repeat(70) + "\n");
    }
  }
};

// Run security validation
validateSecurityConfig();

interface Config {
  port: number;
  nodeEnv: string;
  frontendUrl: string;
  database: {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
    dialect: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  cors: {
    origin: string;
    allowedOrigins: string[];
  };
  upload: {
    maxFileSize: number;
    path: string;
  };
  rateLimit: {
    windowMs: number;
    maxRequests: number;
  };
  admin: {
    email: string;
    password: string;
  };
}

// Use environment variable or generate a secure secret for development
// In production, JWT_SECRET SHOULD be set via environment variable
const jwtSecret =
  process.env.JWT_SECRET &&
  process.env.JWT_SECRET !== "default_secret_change_me"
    ? process.env.JWT_SECRET
    : (() => {
        if (process.env.NODE_ENV === "production") {
          console.error(
            "⚠️ WARNING: JWT_SECRET not set in production! Using generated secret.",
          );
          console.error(
            "   This is insecure - set JWT_SECRET environment variable!",
          );
        }
        return generateSecureSecret();
      })();

const config: Config = {
  port: parseInt(process.env.PORT || "3000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  database: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    name: process.env.DB_NAME || "medcast_db",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    dialect: process.env.DB_DIALECT || "sqlite",
  },
  jwt: {
    secret: jwtSecret as string,
    expiresIn: process.env.JWT_EXPIRES_IN || "24h", // Reduced from 7d to 24h for better security
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:5173",
    ],
  },
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || "5242880", 10), // 5MB
    path: process.env.UPLOAD_PATH || "uploads",
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10), // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100", 10),
  },
  admin: {
    email: process.env.ADMIN_EMAIL || "admin@medcast.com",
    password: process.env.ADMIN_PASSWORD || "Admin@123",
  },
};

export default config;
