import { Sequelize } from "sequelize";
import config from "./env";

const sequelize = new Sequelize(config.database.url, {
  dialect: "postgres",
  logging: config.env === "development" ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    paranoid: true,
  },
});

export default sequelize;
