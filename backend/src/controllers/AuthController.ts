import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { generateAccessToken } from "@services/tokenService";
import UserModel from "@models/User";
import RefreshToken from "@models/RefreshToken";

class AuthController {
  static async register(req: Request, res: Response): Promise<Response> {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ message: "Заполните все поля" });
    }

    try {
      const existingUser = await UserModel.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email уже используется" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await UserModel.create({ email, name, password: hashedPassword });

      return res.status(201).json({ message: "Регистрация успешна" });
    } catch (error) {
      return res.status(500).json({
        message: "Ошибка сервера",
        error: (error as Error).message,
      });
    }
  }

  static async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Заполните email и пароль" });
    }

    try {
      const user = await UserModel.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Неверные email или пароль" });
      }

      const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
      });
      const refreshToken = uuidv4();

      await RefreshToken.create({
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      return res.status(500).json({
        message: "Ошибка сервера",
        error: (error as Error).message,
      });
    }
  }

  static async refresh(req: Request, res: Response): Promise<Response> {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "Отсутствует refresh token" });
    }

    try {
      const tokenData = await RefreshToken.findOne({
        where: { token: refreshToken },
      });
      if (!tokenData || tokenData.expiresAt < new Date()) {
        return res
          .status(401)
          .json({ message: "Refresh token недействителен" });
      }

      const user = await UserModel.findByPk(tokenData.userId);
      if (!user) {
        return res.status(401).json({ message: "Пользователь не найден" });
      }

      const newAccessToken = generateAccessToken({
        id: user.id,
        email: user.email,
      });

      return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      return res.status(500).json({
        message: "Ошибка сервера",
        error: (error as Error).message,
      });
    }
  }
}

export default AuthController;
