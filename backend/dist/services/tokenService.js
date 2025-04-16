"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("../config/config.js"); // добавь .js, если type: "module" в package.json
// Генерация JWT access token
const generateAccessToken = (user) => {
  return jsonwebtoken_1.default.sign(
    { id: user.id, email: user.email },
    config_js_1.jwtSecret,
    {
      expiresIn: config_js_1.accessTokenExpired,
    },
  );
};
exports.generateAccessToken = generateAccessToken;
