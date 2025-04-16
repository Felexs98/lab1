"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class EventModel extends sequelize_1.Model {}
const Event = db_1.sequelize.define(
  "Event",
  {
    id: {
      type: sequelize_1.DataTypes.UUID,
      defaultValue: sequelize_1.DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: sequelize_1.DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: sequelize_1.DataTypes.TEXT,
    },
    date: {
      type: sequelize_1.DataTypes.DATE,
      allowNull: false,
    },
    category: {
      type: sequelize_1.DataTypes.ENUM(
        "концерт",
        "лекция",
        "выставка",
        "семинар",
        "фестиваль",
      ),
      allowNull: false,
      defaultValue: "лекция",
    },
    createdBy: {
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
exports.default = Event;
