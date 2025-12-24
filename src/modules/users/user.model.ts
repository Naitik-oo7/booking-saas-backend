import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

/**
 * 1. DB attributes
 */
export interface UserAttributes {
  id: number;
  email: string;
  firstName: string;

  lastName: string;
  passwordHash: string;
  role: string; // platform role
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * 2. Attributes allowed during creation
 */
export interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "role" | "status"> {}

/**
 * 3. Model
 */
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare passwordHash: string;
  declare role: string;
  declare status: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default User;
