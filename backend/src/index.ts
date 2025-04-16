import dotenv from "dotenv";
dotenv.config();

import { authenticateDB } from "@config/db";
import { syncDatabase } from "./models";
import app from "./app";

const PORT = process.env.PORT || 5000;

// Подключение к базе и запуск сервера
authenticateDB()
  .then(async () => {
    await syncDatabase();
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Не удалось подключиться к базе данных:", err);
    process.exit(1);
  });
