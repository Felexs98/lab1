import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
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
  apis: ["./src/routes/*.ts"], // Обновлено для TypeScript
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
