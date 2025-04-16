"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(
  require("../controllers/UserController"),
);
const router = express_1.default.Router();
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
router.get("/", UserController_1.default.getAllUsers);
exports.default = router;
