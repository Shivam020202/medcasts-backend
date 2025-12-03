import { Sequelize } from "sequelize";
import "../models"; // Import all models

// Create a temporary MySQL connection just for schema generation
const sequelize = new Sequelize("medcasts_db", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  logging: console.log, // This will output all SQL statements
});

const generateSchema = async () => {
  try {
    console.log("🔄 Generating database schema SQL...");
    console.log("=" .repeat(80));
    console.log("-- SQL Schema for medcasts_db");
    console.log("-- Copy everything below and run in cPanel phpMyAdmin");
    console.log("=" .repeat(80));
    console.log("");
    
    // This will output CREATE TABLE statements
    await sequelize.sync({ force: false });
    
    console.log("");
    console.log("=" .repeat(80));
    console.log("✅ Schema generation complete!");
    console.log("\n📋 Next steps:");
    console.log("   1. Copy all CREATE TABLE statements above");
    console.log("   2. Log into cPanel > phpMyAdmin");
    console.log("   3. Select database: medcasts_db");
    console.log("   4. Go to SQL tab");
    console.log("   5. Paste and execute the statements");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error generating schema:", error);
    process.exit(1);
  }
};

generateSchema();
