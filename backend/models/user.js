const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,  // Генерирует уникальный UUID автоматически
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,  // Обязательное поле
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Уникальный email
    validate: {
      isEmail: true,  // Проверка формата email
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,  // Отключаем автоматическое добавление updatedAt
});

module.exports = User;
