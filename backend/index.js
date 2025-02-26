require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { authenticateDB } = require('./config/db');
const { syncDatabase } = require('./models');
const eventRoutes = require('./routes/events'); // Подключаем маршруты
const userRoutes = require('./routes/users');

const app = express();

app.use(express.json()); // Обработка JSON-запросов
app.use(cors()); // Разрешение кросс-доменных запросов

const PORT = process.env.PORT || 5000;

authenticateDB().then(async () => {
    await syncDatabase();

    // 🔥 Подключаем маршруты мероприятий
    app.use('/events', eventRoutes);
	app.use('/users', userRoutes);

    app.get('/', (req, res) => {
        res.json({ message: 'Сервер работает!' });
    });

    app.listen(PORT, () => {
        console.log(`Сервер запущен на порту ${PORT}`);
    });
}).catch((err) => {
    console.error('Не удалось подключиться к базе данных:', err);
    process.exit(1);
});
