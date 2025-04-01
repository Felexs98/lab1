// index.js
require('dotenv').config();
const { authenticateDB } = require('./config/db');
const { syncDatabase } = require('./models');
const app = require('./app'); // Подключаем готовый app

const PORT = process.env.PORT || 5000;

// Подключение к базе и запуск сервера
authenticateDB().then(async () => {
    await syncDatabase();
    app.listen(PORT, () => console.log(` Сервер запущен на порту ${PORT}`));
}).catch(err => {
    console.error(' Не удалось подключиться к базе данных:', err);
    process.exit(1);
});
