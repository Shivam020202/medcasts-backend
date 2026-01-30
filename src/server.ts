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

// Trust proxy - required for rate limiting and X-Forwarded-For headers behind cPanel/Passenger
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
        ],
        scriptSrcAttr: ["'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com"],
        imgSrc: ["'self'", "data:", "blob:", "https:"],
      },
    },
  })
);

// Enable CORS for development
if (config.nodeEnv === "development") {
  app.use(
    cors({
      origin: true, // Allow all origins in development
      credentials: true,
    })
  );
}
// For production (cPanel), CORS is handled by the server configuration
// If you need to re-enable Express CORS for production, you MUST disable cPanel's CORS first

// Rate limiting with config
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Compression middleware
app.use(compression());

// Logging middleware
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

// Database connection and server start
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");

    // Sync models (in development only)
    if (config.nodeEnv === "development") {
      await sequelize.sync({ alter: false });
      console.log("✅ Database models synchronized.");

      // Initialize database with default data
      await initializeDatabase();
    }

    // Start server
    const PORT = config.port;
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📍 Environment: ${config.nodeEnv}`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
      console.log(`⏰ Server started at: ${new Date().toISOString()}`);
    });

    // Keep the process alive
    server.on("error", (error: any) => {
      if (error.syscall !== "listen") {
        throw error;
      }

      switch (error.code) {
        case "EACCES":
          console.error(`Port ${PORT} requires elevated privileges`);
          process.exit(1);
          break;
        case "EADDRINUSE":
          console.error(`Port ${PORT} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    });

    console.log("✅ Server initialization complete. Waiting for requests...");
  } catch (error) {
    console.error("❌ Unable to start server:", error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});

startServer();

export default app;
