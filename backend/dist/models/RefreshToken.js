"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class RefreshTokenModel extends sequelize_1.Model {}
const RefreshToken = db_1.sequelize.define(
  "RefreshToken",
  {
    token: {
      type: sequelize_1.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    expiresAt: {
      type: sequelize_1.DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: sequelize_1.DataTypes.UUID,
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
exports.default = RefreshToken;
