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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("./config/db");
const models_1 = require("./models");
const app_js_1 = __importDefault(require("./app.js"));
const PORT = process.env.PORT || 5000;
// Подключение к базе и запуск сервера
(0, db_1.authenticateDB)()
  .then(() =>
    __awaiter(void 0, void 0, void 0, function* () {
      yield (0, models_1.syncDatabase)();
      app_js_1.default.listen(PORT, () => {
        console.log(`Сервер запущен на порту ${PORT}`);
      });
    }),
  )
  .catch((err) => {
    console.error("Не удалось подключиться к базе данных:", err);
    process.exit(1);
  });
