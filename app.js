// Hostinger Node.js Web Apps entry point
// This is the main entry point for the application

const path = require("path");

// Load environment variables - use .env.production if NODE_ENV is production
// or if .env.production exists and we're on the server
const dotenv = require("dotenv");

// First try to load .env.production (for Hostinger deployment)
const prodEnvResult = dotenv.config({ path: path.join(__dirname, ".env.production") });

// If .env.production doesn't exist, fall back to .env
if (prodEnvResult.error) {
  dotenv.config({ path: path.join(__dirname, ".env") });
  console.log("📄 Loaded .env file");
} else {
  console.log("📄 Loaded .env.production file");
}

// Force production mode on Hostinger
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "production";
}

// Ensure USE_SQLITE is false in production
if (process.env.NODE_ENV === "production") {
  process.env.USE_SQLITE = "false";
}

console.log(`📍 Environment: ${process.env.NODE_ENV}`);
console.log(`🗄️  DB Host: ${process.env.DB_HOST}`);
console.log(`🗄️  DB Name: ${process.env.DB_NAME}`);
console.log(`🗄️  DB User: ${process.env.DB_USER}`);
console.log(`🗄️  DB Port: ${process.env.DB_PORT}`);
console.log(`🗄️  USE_SQLITE: ${process.env.USE_SQLITE}`);

// Load the compiled Express application
const app = require("./dist/server").default;
const { sequelize } = require("./dist/models");

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  // Connect to database
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
    
    // Sync tables in production (safe - only creates missing tables)
    await sequelize.sync({ alter: false });
    console.log("✅ Database tables synced");
    
    // Initialize default admin user if needed
    try {
      const { initializeDatabase } = require("./dist/utils/initDb");
      await initializeDatabase();
    } catch (initErr) {
      console.error("⚠️ Database initialization warning:", initErr.message);
    }
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    console.error("❌ Full error:", error);
  }
});

module.exports = app;
