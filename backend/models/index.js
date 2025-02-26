const { sequelize } = require('../config/db');
const User = require('./user');
const Event = require('./event');

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });  // Синхронизация с БД
    console.log('База данных синхронизирована.');
  } catch (error) {
    console.error('Ошибка при синхронизации базы данных:', error);
  }
};

module.exports = { syncDatabase, User, Event };
