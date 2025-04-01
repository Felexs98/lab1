// app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('./config/passport');
const { swaggerUi, specs } = require('./swagger');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const helmet = require('helmet');
const compression = require('compression');

require('./models/relations'); // Подключаем связи моделей

const app = express();

// Основные middleware
app.use(express.json());
app.use(cors());
app.use(helmet()); // Безопасность HTTP заголовков
app.use(compression()); // Сжатие ответов
app.use(morgan(':method :url :status - :response-time ms'));

app.use(passport.initialize());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Основные маршруты
app.use(routes);

// Глобальный обработчик ошибок
app.use(errorHandler);

module.exports = app;
