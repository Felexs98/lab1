"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const tokenService_1 = require("../services/tokenService");
const User_1 = __importDefault(require("../models/User"));
const RefreshToken_1 = __importDefault(require("../models/RefreshToken"));
class AuthController {
  static register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const { email, name, password } = req.body;
      if (!email || !name || !password) {
        return res.status(400).json({ message: "Заполните все поля" });
      }
      try {
        const existingUser = yield User_1.default.findOne({ where: { email } });
        if (existingUser) {
          return res.status(400).json({ message: "Email уже используется" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        yield User_1.default.create({ email, name, password: hashedPassword });
        return res.status(201).json({ message: "Регистрация успешна" });
      } catch (error) {
        return res.status(500).json({
          message: "Ошибка сервера",
          error: error.message,
        });
      }
    });
  }
  static login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Заполните email и пароль" });
      }
      try {
        const user = yield User_1.default.findOne({ where: { email } });
        if (
          !user ||
          !(yield bcryptjs_1.default.compare(password, user.password))
        ) {
          return res.status(401).json({ message: "Неверные email или пароль" });
        }
        const accessToken = (0, tokenService_1.generateAccessToken)({
          id: user.id,
          email: user.email,
        });
        const refreshToken = (0, uuid_1.v4)();
        yield RefreshToken_1.default.create({
          token: refreshToken,
          userId: user.id,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        return res.status(200).json({ accessToken, refreshToken });
      } catch (error) {
        return res.status(500).json({
          message: "Ошибка сервера",
          error: error.message,
        });
      }
    });
  }
  static refresh(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({ message: "Отсутствует refresh token" });
      }
      try {
        const tokenData = yield RefreshToken_1.default.findOne({
          where: { token: refreshToken },
        });
        if (!tokenData || tokenData.expiresAt < new Date()) {
          return res
            .status(401)
            .json({ message: "Refresh token недействителен" });
        }
        const user = yield User_1.default.findByPk(tokenData.userId);
        if (!user) {
          return res.status(401).json({ message: "Пользователь не найден" });
        }
        const newAccessToken = (0, tokenService_1.generateAccessToken)({
          id: user.id,
          email: user.email,
        });
        return res.status(200).json({ accessToken: newAccessToken });
      } catch (error) {
        return res.status(500).json({
          message: "Ошибка сервера",
          error: error.message,
        });
      }
    });
  }
}
exports.default = AuthController;
