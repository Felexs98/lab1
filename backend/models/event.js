const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user');  // Импортируем модель User

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,  // Обязательное поле
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,  // Дата обязательна
  },
  category: {
    type: DataTypes.ENUM('концерт', 'лекция', 'выставка', 'семинар', 'фестиваль'),
    allowNull: false,
    defaultValue: 'лекция', // Укажите значение по умолчанию
},

  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,  // Внешний ключ
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  timestamps: false,
});

// Определяем связь "Один ко многим": Один пользователь -> Много мероприятий
User.hasMany(Event, { foreignKey: 'createdBy' });
Event.belongsTo(User, { foreignKey: 'createdBy' });

module.exports = Event;
