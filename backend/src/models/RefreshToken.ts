import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface RefreshTokenAttributes {
  token: string;
  expiresAt: Date;
  userId: string;
}

type RefreshTokenCreationAttributes = Optional<RefreshTokenAttributes, "token">;

class RefreshTokenModel
  extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes>
  implements RefreshTokenAttributes
{
  public token!: string;
  public expiresAt!: Date;
  public userId!: string;
}

const RefreshToken = sequelize.define<RefreshTokenModel>(
  "RefreshToken",
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: false,
  },
);

export default RefreshToken;
