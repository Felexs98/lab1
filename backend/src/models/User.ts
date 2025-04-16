import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@config/db";

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

type UserCreationAttributes = Optional<UserAttributes, "id" | "createdAt">;

class UserModel
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
}

const User = sequelize.define<UserModel>(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  },
);

export default User;
