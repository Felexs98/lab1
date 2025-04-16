"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(
  require("../controllers/AuthController"),
);
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Регистрация и авторизация
 */
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Пользователь успешно зарегистрирован
 *       400:
 *         description: Ошибка валидации или email уже используется
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post("/register", (req, res) => {
  void AuthController_1.default.register(req, res);
});
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Авторизация пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешная авторизация и получение JWT
 *       400:
 *         description: Ошибка валидации данных
 *       401:
 *         description: Неверные email или пароль
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post("/login", (req, res) => {
  void AuthController_1.default.login(req, res);
});
/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Обновить Access Token по Refresh Token
 *     tags: [Auth]
 *     description: Получение нового Access Token без повторного ввода логина и пароля.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Действующий Refresh Token, выданный при авторизации.
 *                 example: "your-refresh-token"
 *     responses:
 *       200:
 *         description: Успешное обновление Access Token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Новый Access Token.
 *       400:
 *         description: Если Refresh Token не передан.
 *       401:
 *         description: Если Refresh Token не найден или истёк.
 *       500:
 *         description: Внутренняя ошибка сервера.
 */
router.post("/refresh", (req, res) => {
  void AuthController_1.default.refresh(req, res);
});
exports.default = router;
