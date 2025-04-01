const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Event = sequelize.define('Event', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    date: { type: DataTypes.DATE, allowNull: false },
    category: { type: DataTypes.ENUM('концерт', 'лекция', 'выставка', 'семинар', 'фестиваль'), allowNull: false, defaultValue: 'лекция' },
    createdBy: { type: DataTypes.UUID, allowNull: false, references: { model: 'Users', key: 'id' }, onDelete: 'CASCADE' }
}, { timestamps: false });

module.exports = Event;