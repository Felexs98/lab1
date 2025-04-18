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
exports.RefreshToken =
  exports.Event =
  exports.User =
  exports.syncDatabase =
  exports.sequelize =
    void 0;
const db_1 = require("../config/db");
Object.defineProperty(exports, "sequelize", {
  enumerable: true,
  get: function () {
    return db_1.sequelize;
  },
});
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const Event_1 = __importDefault(require("./Event"));
exports.Event = Event_1.default;
const RefreshToken_1 = __importDefault(require("./RefreshToken"));
exports.RefreshToken = RefreshToken_1.default;
require("./relations");
const syncDatabase = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      yield db_1.sequelize.sync({ alter: true });
      console.log("База данных синхронизирована.");
    } catch (error) {
      console.error("Ошибка при синхронизации базы данных:", error.message);
    }
  });
exports.syncDatabase = syncDatabase;
