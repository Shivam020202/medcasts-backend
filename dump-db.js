// Database dump script for MedCasts
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

const config = {
  host: "82.197.82.54",
  port: 3306,
  user: "u677323375_medcasts_user",
  password: "Medcasts@4321",
  database: "u677323375_medcasts_db",
};

const OUTPUT_FILE = path.join(__dirname, "database-dump.sql");

async function dumpDatabase() {
  let connection;
  try {
    console.log(`Connecting to ${config.host}:${config.port}/${config.database}...`);
    connection = await mysql.createConnection(config);
    console.log("Connected successfully!");

    let output = "";
    output += `-- MedCasts Database Dump\n`;
    output += `-- Generated: ${new Date().toISOString()}\n`;
    output += `-- Host: ${config.host}\n`;
    output += `-- Database: ${config.database}\n\n`;
    output += `SET FOREIGN_KEY_CHECKS = 0;\n`;
    output += `SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';\n\n`;

    // Get all tables
    const [tables] = await connection.query("SHOW TABLES");
    const tableKey = `Tables_in_${config.database}`;
    console.log(`Found ${tables.length} tables`);

    for (const tableRow of tables) {
      const tableName = tableRow[tableKey];
      console.log(`Dumping table: ${tableName}...`);

      // Get CREATE TABLE statement
      const [createResult] = await connection.query(`SHOW CREATE TABLE \`${tableName}\``);
      const createStatement = createResult[0]["Create Table"];

      output += `-- ----------------------------\n`;
      output += `-- Table structure for ${tableName}\n`;
      output += `-- ----------------------------\n`;
      output += `DROP TABLE IF EXISTS \`${tableName}\`;\n`;
      output += `${createStatement};\n\n`;

      // Get all rows
      const [rows] = await connection.query(`SELECT * FROM \`${tableName}\``);
      
      if (rows.length > 0) {
        output += `-- ----------------------------\n`;
        output += `-- Records of ${tableName} (${rows.length} rows)\n`;
        output += `-- ----------------------------\n`;

        // Get column names
        const columns = Object.keys(rows[0]);
        const colList = columns.map(c => `\`${c}\``).join(", ");

        for (const row of rows) {
          const values = columns.map(col => {
            const val = row[col];
            if (val === null) return "NULL";
            if (typeof val === "number") return val;
            if (val instanceof Date) return `'${val.toISOString().slice(0, 19).replace("T", " ")}'`;
            if (Buffer.isBuffer(val)) return `X'${val.toString("hex")}'`;
            // Escape string
            const escaped = String(val)
              .replace(/\\/g, "\\\\")
              .replace(/'/g, "\\'")
              .replace(/\n/g, "\\n")
              .replace(/\r/g, "\\r")
              .replace(/\t/g, "\\t");
            return `'${escaped}'`;
          });
          output += `INSERT INTO \`${tableName}\` (${colList}) VALUES (${values.join(", ")});\n`;
        }
        output += "\n";
      }
    }

    output += `SET FOREIGN_KEY_CHECKS = 1;\n`;

    // Write to file
    fs.writeFileSync(OUTPUT_FILE, output, "utf8");
    console.log(`\nDump saved to: ${OUTPUT_FILE}`);
    console.log(`File size: ${(Buffer.byteLength(output) / 1024).toFixed(1)} KB`);

  } catch (error) {
    console.error("Error:", error.message);
    if (error.code) console.error("Error code:", error.code);
  } finally {
    if (connection) await connection.end();
  }
}

dumpDatabase();
