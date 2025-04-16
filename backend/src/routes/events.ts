import express from "express";
import passport from "passport";
import EventController from "@controllers/EventController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Управление мероприятиями
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Получить список мероприятий
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Список мероприятий
 */
router.get("/", (req, res) => {
  void EventController.getAllEvents(req, res);
});

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Получить мероприятие по ID
 *     tags: [Events]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Мероприятие найдено
 *       404:
 *         description: Мероприятие не найдено
 */
router.get("/:id", (req, res) => {
  void EventController.getEventById(req, res);
});

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Создать новое мероприятие
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - date
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Мероприятие создано
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => void EventController.createEvent(req, res),
);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Обновить мероприятие
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Обновлено
 */
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => void EventController.updateEvent(req, res),
);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Удалить мероприятие
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Удалено
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => void EventController.deleteEvent(req, res),
);

export default router;
