import { Request, Response } from "express";
import User from "@models/User";

class UserController {
  static async getAllUsers(_req: Request, res: Response): Promise<void> {
    try {
      const users = await User.findAll({
        attributes: ["id", "name", "email"],
      });
      res.status(200).json({ data: users });
    } catch (error: any) {
      res.status(500).json({ error: "Ошибка сервера", details: error.message });
    }
  }
}

export default UserController;
