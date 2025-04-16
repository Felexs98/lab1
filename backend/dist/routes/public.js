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
const express_1 = __importDefault(require("express"));
const models_1 = require("../models");
const router = express_1.default.Router();
router.get("/events", (_req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const events = yield models_1.Event.findAll();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: "Ошибка сервера", details: error.message });
    }
  }),
);
router.get("/events/:id", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const event = yield models_1.Event.findByPk(req.params.id);
      if (!event) {
        res.status(404).json({ error: "Мероприятие не найдено" });
        return;
      }
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ error: "Ошибка сервера", details: error.message });
    }
  }),
);
exports.default = router;
