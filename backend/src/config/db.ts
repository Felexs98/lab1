import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

//
const DB_NAME = process.env.DB_NAME as string;
const DB_USER = process.env.DB_USER as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;
const DB_HOST = process.env.DB_HOST as string;
const DB_PORT = parseInt(process.env.DB_PORT || "5432", 10);
const DB_DIALECT = (process.env.DB_DIALECT || "postgres") as any;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  logging: false,
});

export const authenticateDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("Подключение к базе данных успешно.");
  } catch (error) {
    console.error("Ошибка подключения к базе данных:", error);
  }
};

export { sequelize };
