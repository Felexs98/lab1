"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const EventController_1 = __importDefault(
  require("../controllers/EventController"),
);
const router = express_1.default.Router();
// Публичные маршруты
router.get("/", (req, res) => {
  void EventController_1.default.getAllEvents(req, res);
});
router.get("/:id", (req, res) => {
  void EventController_1.default.getEventById(req, res);
});
// Авторизованные маршруты
router.post(
  "/",
  passport_1.default.authenticate("jwt", { session: false }),
  (req, res) => void EventController_1.default.createEvent(req, res),
);
router.put(
  "/:id",
  passport_1.default.authenticate("jwt", { session: false }),
  (req, res) => void EventController_1.default.updateEvent(req, res),
);
router.delete(
  "/:id",
  passport_1.default.authenticate("jwt", { session: false }),
  (req, res) => void EventController_1.default.deleteEvent(req, res),
);
exports.default = router;
