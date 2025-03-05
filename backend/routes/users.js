const express = require('express');
const { User } = require('../models');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Управление пользователями (требуется авторизация)
 */

<<<<<<< HEAD
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Получить список всех пользователей
 *     tags: [Users]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Список пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
=======
 /**
  * @swagger
  * /users:
  *   get:
  *     summary: Получить список всех пользователей
  *     tags: [Users]
  *     security:
  *       - BearerAuth: []
  *     responses:
  *       200:
  *         description: Список пользователей
  */

>>>>>>> feature/lab2
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера', details: error.message });
    }
});

<<<<<<< HEAD
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Создать нового пользователя
 *     tags: [Users]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Иван Иванов"
 *               email:
 *                 type: string
 *                 example: "ivan@example.com"
 *     responses:
 *       201:
 *         description: Пользователь успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Ошибка валидации или email уже используется
 *       500:
 *         description: Внутренняя ошибка сервера
 */
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

=======
>>>>>>> feature/lab2
module.exports = router;
