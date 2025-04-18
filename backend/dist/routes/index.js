"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("../config/passport"));
const auth_1 = __importDefault(require("./auth"));
const users_1 = __importDefault(require("./users"));
const events_1 = __importDefault(require("./events"));
const router = express_1.default.Router();
// Подключаем маршруты
router.use("/auth", auth_1.default);
router.use(
  "/users",
  passport_1.default.authenticate("jwt", { session: false }),
  users_1.default,
);
router.use("/events", events_1.default);
exports.default = router;
