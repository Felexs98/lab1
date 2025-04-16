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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class UserController {
  static getAllUsers(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const users = yield models_1.User.findAll({
          attributes: ["id", "name", "email"],
        });
        res.status(200).json({ data: users });
      } catch (error) {
        res
          .status(500)
          .json({ error: "Ошибка сервера", details: error.message });
      }
    });
  }
}
exports.default = UserController;
