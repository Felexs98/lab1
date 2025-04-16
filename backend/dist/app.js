"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const passport_1 = __importDefault(require("./config/passport"));
const swagger_1 = require("./swagger");
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
require("./models/relations"); // Подключаем связи моделей
const app = (0, express_1.default)();
// Основные middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)()); // Безопасность HTTP заголовков
app.use((0, compression_1.default)()); // Сжатие ответов
app.use((0, morgan_1.default)(":method :url :status - :response-time ms"));
app.use(passport_1.default.initialize());
// Swagger
app.use(
  "/api-docs",
  swagger_1.swaggerUi.serve,
  swagger_1.swaggerUi.setup(swagger_1.specs),
);
// Основные маршруты
app.use(routes_1.default);
// Глобальный обработчик ошибок
app.use(errorHandler_1.default);
exports.default = app;
