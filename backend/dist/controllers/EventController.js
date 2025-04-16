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
const Event_js_1 = __importDefault(require("../models/Event.js"));
class EventController {
  static getAllEvents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const events = yield Event_js_1.default.findAll();
        return res.status(200).json({ data: events });
      } catch (error) {
        return res.status(500).json({
          error: "Ошибка сервера",
          details: error.message,
        });
      }
    });
  }
  static getEventById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const event = yield Event_js_1.default.findByPk(req.params.id);
        if (!event) {
          return res.status(404).json({ error: "Мероприятие не найдено" });
        }
        return res.status(200).json({ data: event });
      } catch (error) {
        return res.status(500).json({
          error: "Ошибка сервера",
          details: error.message,
        });
      }
    });
  }
  static createEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a;
      if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
        return res.status(401).json({ message: "Неавторизован" });
      }
      const { title, description, date, category } = req.body;
      if (!title || !date || !category || isNaN(Date.parse(date))) {
        return res.status(400).json({ error: "Неверные или неполные данные" });
      }
      try {
        const event = yield Event_js_1.default.create({
          title,
          description,
          date,
          category,
          createdBy: req.user.id,
        });
        return res.status(201).json({ data: event });
      } catch (error) {
        return res.status(500).json({
          error: "Ошибка сервера",
          details: error.message,
        });
      }
    });
  }
  static updateEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a;
      if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
        return res.status(401).json({ message: "Неавторизован" });
      }
      try {
        const event = yield Event_js_1.default.findByPk(req.params.id);
        if (!event) {
          return res.status(404).json({ error: "Мероприятие не найдено" });
        }
        if (event.createdBy !== req.user.id) {
          return res.status(403).json({ error: "Нет прав на редактирование" });
        }
        if (req.body.date && isNaN(Date.parse(req.body.date))) {
          return res.status(400).json({ error: "Неверный формат даты" });
        }
        yield event.update(req.body);
        return res
          .status(200)
          .json({ message: "Мероприятие обновлено", data: event });
      } catch (error) {
        return res.status(500).json({
          error: "Ошибка при обновлении",
          details: error.message,
        });
      }
    });
  }
  static deleteEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a;
      if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
        return res.status(401).json({ message: "Неавторизован" });
      }
      try {
        const event = yield Event_js_1.default.findByPk(req.params.id);
        if (!event) {
          return res.status(404).json({ error: "Мероприятие не найдено" });
        }
        if (event.createdBy !== req.user.id) {
          return res.status(403).json({ error: "Нет прав на удаление" });
        }
        yield event.destroy();
        return res.status(200).json({ message: "Мероприятие удалено" });
      } catch (error) {
        return res.status(500).json({
          error: "Ошибка при удалении",
          details: error.message,
        });
      }
    });
  }
}
exports.default = EventController;
