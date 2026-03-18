import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import path from "path";
import config from "./config";
import { sequelize } from "./models";
import routes from "./routes";
import { errorHandler, notFound } from "./middleware/error";
import { initializeDatabase } from "./utils/initDb";

const app: Application = express();

// Trust proxy - required for rate limiting behind reverse proxy
app.set("trust proxy", 1);

// Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "cdn.tailwindcss.com",
          "cdn.jsdelivr.net",
          "cdnjs.cloudflare.com",
        ],
        scriptSrcAttr: ["'unsafe-inline'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "cdnjs.cloudflare.com",
          "fonts.googleapis.com",
        ],
        fontSrc: ["'self'", "fonts.gstatic.com", "cdnjs.cloudflare.com"],
        imgSrc: ["'self'", "data:", "blob:", "https:"],
        connectSrc: ["'self'", "https:"],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    noSniff: true,
    xssFilter: true,
  }),
);

// Security headers
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// CORS - enable for all environments
app.use(
  cors({
    origin: config.cors.allowedOrigins,
    credentials: true,
  }),
);

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Compression
app.use(compression());

// Logging
if (config.nodeEnv === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/admin", express.static(path.join(__dirname, "../public")));

// API routes
app.use("/api", routes);

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MedCast API Server",
    version: "1.0.0",
  });
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
  // Start HTTP server FIRST (before DB connection)
  // This is required for Hostinger's Node.js hosting
  const PORT = process.env.PORT || 3000;

  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${config.nodeEnv}`);
  });

  // Then connect to database
  await initDatabase();
};

// Initialize database connection (can be called independently)
const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    // Sync models (safe - alter: false only creates missing tables)
    await sequelize.sync({ alter: false });
    console.log("✅ Database tables synced");
    
    // Initialize default data (admin user, etc.)
    await initializeDatabase();
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    // Don't exit - keep server running so Hostinger doesn't restart it
  }
};

// Error handlers
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  // Don't exit in production to keep Hostinger happy
  if (process.env.NODE_ENV !== "production") {
    process.exit(1);
  }
});

// Only start server if this file is run directly (not imported by Passenger)
// Passenger will handle the server startup itself
if (require.main === module) {
  startServer();
} else {
  // When imported (e.g., by Passenger), just initialize the database
  initDatabase();
}

export default app;
export { initDatabase };
