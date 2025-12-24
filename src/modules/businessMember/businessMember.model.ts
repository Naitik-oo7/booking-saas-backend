import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";
import User from "../users/user.model";
import Business from "../business/business.model";

export interface BusinessMemberAttributes {
  id: number;
  userId: number;
  businessId: number;
  role: string; // owner | manager | staff
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BusinessMemberCreationAttributes
  extends Optional<BusinessMemberAttributes, "id" | "status"> {}

class BusinessMember
  extends Model<BusinessMemberAttributes, BusinessMemberCreationAttributes>
  implements BusinessMemberAttributes
{
  declare id: number;
  declare userId: number;
  declare businessId: number;
  declare role: string;
  declare status: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

BusinessMember.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    role: {
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
    tableName: "business_members",
    indexes: [
      {
        unique: true,
        fields: ["userId", "businessId"],
      },
    ],
  }
);

// Associations
User.hasMany(BusinessMember, { foreignKey: "userId" });
BusinessMember.belongsTo(User, { foreignKey: "userId" });

Business.hasMany(BusinessMember, { foreignKey: "businessId" });
BusinessMember.belongsTo(Business, { foreignKey: "businessId" });

export default BusinessMember;
