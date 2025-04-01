const express = require('express');
const UserController = require('../controllers/UserController');
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
router.get('/', UserController.getAllUsers);

module.exports = router;
