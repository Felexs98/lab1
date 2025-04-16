"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.specs = exports.swaggerUi = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
exports.swaggerUi = swagger_ui_express_1.default;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Events API",
      version: "1.0.0",
      description:
        "Документация API для управления пользователями и мероприятиями",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Локальный сервер",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.ts"], // Обновлено для TypeScript
};
const specs = (0, swagger_jsdoc_1.default)(options);
exports.specs = specs;
