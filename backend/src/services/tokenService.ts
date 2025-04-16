import jwt from "jsonwebtoken";
import { jwtSecret, accessTokenExpired } from "../config/config";

// Тип данных, из которых создаётся токен
export interface UserPayload {
  id: string;
  email: string;
}

// Генерация JWT access token
export const generateAccessToken = (user: UserPayload): string => {
  return jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
    expiresIn: accessTokenExpired,
  });
};
