"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, _next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Ошибка парсинга JSON:", err.message);
    res.status(400).json({
      error: "Неверный формат JSON",
      details: err.message,
    });
    return;
  }
  console.error("Внутренняя ошибка сервера:", err);
  res.status(500).json({
    error: "Внутренняя ошибка сервера",
    details: err.message,
  });
};
exports.default = errorHandler;
