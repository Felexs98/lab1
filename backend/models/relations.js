const User = require('./User');
const Event = require('./Event');
const RefreshToken = require('./RefreshToken');

// Связи
User.hasMany(Event, { foreignKey: 'createdBy' });
Event.belongsTo(User, { foreignKey: 'createdBy' });

User.hasMany(RefreshToken, { foreignKey: 'userId' });
RefreshToken.belongsTo(User, { foreignKey: 'userId' });

console.log('Модельные связи установлены.');
