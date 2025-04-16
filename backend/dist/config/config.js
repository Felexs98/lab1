"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtSecret =
  exports.refreshTokenExpiredDays =
  exports.accessTokenExpired =
    void 0;
exports.accessTokenExpired = "15m";
exports.refreshTokenExpiredDays = 7; // срок жизни refresh токена в днях
exports.jwtSecret = process.env.JWT_SECRET;
