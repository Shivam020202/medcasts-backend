import { Sequelize } from "sequelize";
import config from "./index";

// For testing, use SQLite ONLY if explicitly set to "true" in development
const useSqlite =
  config.nodeEnv === "development" && process.env.USE_SQLITE === "true";

const sequelize = useSqlite
  ? new Sequelize({
      dialect: "sqlite",
      storage: "./database.sqlite",
      logging: config.nodeEnv === "development" ? console.log : false,
      define: {
        timestamps: true,
        underscored: true,
      },
    })
  : new Sequelize(
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
      }
    );

console.log(`🗄️  Using ${useSqlite ? "SQLite" : "MySQL"} database`);

export default sequelize;
