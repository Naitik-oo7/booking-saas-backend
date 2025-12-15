import { DataTypes } from "sequelize";
import sequelize from "../../config/db";
import bcrypt from "bcryptjs";
import { Model } from "sequelize";

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;

  async validatePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    sequelize,
    tableName: "users",
    hooks: {
      beforeCreate: async (user: any) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
    },
  }
);

export default User;
