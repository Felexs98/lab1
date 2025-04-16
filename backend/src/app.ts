import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

import passport from "@config/passport";
import { swaggerUi, specs } from "./swagger";
import routes from "./routes";
import errorHandler from "@middlewares/errorHandler";

import "@models/relations";

const app: Application = express();

// Основные middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan(":method :url :status - :response-time ms"));

app.use(passport.initialize());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Основные маршруты
app.use(routes);

// Глобальный обработчик ошибок
app.use(errorHandler);

export default app;
