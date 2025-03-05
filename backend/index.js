require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { authenticateDB } = require('./config/db');
const { syncDatabase } = require('./models');
const passport = require('./config/passport'); //
const { swaggerUi, specs } = require('./swagger');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');
const publicRoutes = require('./routes/public'); //

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status - :response-time ms'));
app.use(passport.initialize()); // Инициализация passport

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Публичные маршруты (доступны без авторизации)
app.use('/public', publicRoutes);

// Маршруты авторизации (с API-ключом)
app.use('/auth', authRoutes);

// Маршруты пользователей и мероприятий (только с JWT)
app.use('/users', passport.authenticate('jwt', { session: false }), userRoutes);
app.use('/events', (req, res, next) => {
    console.log('Authorization header:', req.headers.authorization);
    next();
}, passport.authenticate('jwt', { session: false }), eventRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Сервер работает!' });
});

const PORT = process.env.PORT || 5000;

authenticateDB().then(async () => {
    await syncDatabase();
    app.listen(PORT, () => {
        console.log(`Сервер запущен на порту ${PORT}`);
    });
}).catch((err) => {
    console.error('Не удалось подключиться к базе данных:', err);
    process.exit(1);
});
