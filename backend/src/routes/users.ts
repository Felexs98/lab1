import express, { Router } from "express";
import UserController from "@controllers/UserController";

const router: Router = express.Router();

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
router.get("/", UserController.getAllUsers);

export default router;
