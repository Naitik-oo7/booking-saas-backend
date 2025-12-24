import { default as sequelize } from "../config/db";
import User from "../modules/users/user.model";
import Business from "../modules/business/business.model";
import BusinessMember from "../modules/businessMember/businessMember.model";
import config from "../config/env";

// Sync all models
const syncModels = async () => {
  try {
    if (config.env === "development") {
      // In development, alter tables to match models
      await sequelize.sync({ alter: true });
      console.log(
        "All models were synchronized successfully (development mode)."
      );
    } else {
      // In production, only create tables that don't exist
      await sequelize.sync({ alter: false });
      console.log(
        "All models were synchronized successfully (production mode)."
      );
    }
  } catch (error) {
    console.error("Error synchronizing models:", error);
  }
};

export { sequelize, User, Business, BusinessMember, syncModels };
