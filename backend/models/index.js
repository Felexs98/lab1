const { sequelize } = require('../config/db');
const User = require('./User');
const Event = require('./Event');
const RefreshToken = require('./RefreshToken');
require('./relations');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('База данных синхронизирована.');
    } catch (error) {
        console.error('Ошибка при синхронизации базы данных:', error);
    }
};

module.exports = { sequelize, syncDatabase, User, Event, RefreshToken };