const express = require('express');
const { User } = require('../models'); // Импортируем модель пользователя
const { Op } = require('sequelize');

const router = express.Router();

//  Получение списка всех пользователей (GET /users)
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера', details: error.message });
    }
});

//  Создание нового пользователя (POST /users)
router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;

        // Проверка на заполнение полей
        if (!name || !email) {
            return res.status(400).json({ error: 'Поля name и email обязательны' });
        }

        // Проверка уникальности email
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Этот email уже зарегистрирован' });
        }

        // Создание пользователя
        const newUser = await User.create({ name, email });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании пользователя', details: error.message });
    }
});

module.exports = router;
