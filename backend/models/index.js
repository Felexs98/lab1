const { sequelize } = require('../config/db');
const User = require('./user');
const Event = require('./event');
const RefreshToken = require('./refreshToken');  // Добавили модель refresh токенов

// Связи между моделями:
User.hasMany(Event, { foreignKey: 'createdBy' });
Event.belongsTo(User, { foreignKey: 'createdBy' });

User.hasMany(RefreshToken, { foreignKey: 'userId' });
RefreshToken.belongsTo(User, { foreignKey: 'userId' });

const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });  // `alter` подстроит таблицы под модели без полного удаления
        console.log('База данных синхронизирована.');
    } catch (error) {
        console.error('Ошибка при синхронизации базы данных:', error);
    }
};

module.exports = { syncDatabase, User, Event, RefreshToken };
