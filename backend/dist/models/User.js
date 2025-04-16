"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class UserModel extends sequelize_1.Model {}
const User = db_1.sequelize.define(
  "User",
  {
    id: {
      type: sequelize_1.DataTypes.UUID,
      defaultValue: sequelize_1.DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: sequelize_1.DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: sequelize_1.DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: sequelize_1.DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: sequelize_1.DataTypes.DATE,
      defaultValue: sequelize_1.DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  },
);
exports.default = User;
