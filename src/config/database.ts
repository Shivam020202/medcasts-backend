import { Sequelize } from "sequelize";
import config from "./index";

// In production, always use MySQL
// SQLite is only for local development
const useSqlite =
  config.nodeEnv === "development" && process.env.USE_SQLITE === "true";

let sequelize: Sequelize;

if (useSqlite) {
  // SQLite for local development only
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: console.log,
    define: {
      timestamps: true,
      underscored: true,
    },
  });
} else {
  // MySQL for production
  // Only use SSL if explicitly configured (Hostinger internal MySQL doesn't need SSL)
  const useSSL = process.env.DB_SSL === "true";
  
  sequelize = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
      host: config.database.host,
      port: config.database.port,
      dialect: "mysql",
      logging: config.nodeEnv === "development" ? console.log : false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      define: {
        timestamps: true,
        underscored: true,
      },
      dialectOptions: useSSL
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {},
    },
  );
}

console.log(`🗄️  Using ${useSqlite ? "SQLite" : "MySQL"} database`);

export default sequelize;
