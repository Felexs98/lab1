import { sequelize } from "@config/db";
import User from "./User";
import Event from "./Event";
import RefreshToken from "./RefreshToken";
import "./relations";

const syncDatabase = async (): Promise<void> => {
  try {
    await sequelize.sync({ alter: true });
    console.log("База данных синхронизирована.");
  } catch (error: any) {
    console.error("Ошибка при синхронизации базы данных:", error.message);
  }
};

export { sequelize, syncDatabase, User, Event, RefreshToken };
