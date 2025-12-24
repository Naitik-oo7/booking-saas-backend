import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";
import User from "../users/user.model";

export interface BusinessAttributes {
  id: number;
  name: string;
  ownerId: number;
  timezone: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BusinessCreationAttributes
  extends Optional<BusinessAttributes, "id" | "status"> {}

class Business
  extends Model<BusinessAttributes, BusinessCreationAttributes>
  implements BusinessAttributes
{
  declare id: number;
  declare name: string;
  declare ownerId: number;
  declare timezone: string;
  declare status: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Business.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    timezone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    sequelize,
    tableName: "businesses",
  }
);

// Associations
Business.belongsTo(User, { foreignKey: "ownerId", as: "owner" });
User.hasMany(Business, { foreignKey: "ownerId" });

export default Business;
