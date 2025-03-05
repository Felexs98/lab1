const express = require('express');
const { User } = require('../models');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Управление пользователями (требуется авторизация)
 */

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

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера', details: error.message });
    }
});

module.exports = router;
