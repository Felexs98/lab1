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

router.get('/:id/participants', (req, res) => {
  void EventController.getParticipants(req, res);
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

// Регистрация на мероприятие
/**
 * @swagger
 * /events/{id}/register:
 *   post:
 *     summary: Зарегистрироваться на мероприятие
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID мероприятия
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Успешная регистрация на мероприятие
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Вы успешно зарегистрировались на мероприятие
 *       400:
 *         description: Вы уже зарегистрированы на это мероприятие
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Вы уже зарегистрированы на это мероприятие
 *       401:
 *         description: Неавторизован
 *       500:
 *         description: Ошибка при регистрации
 */
router.post(
  '/:id/register',
  passport.authenticate("jwt", { session: false }),
  (req, res) => void EventController.registerForEvent(req, res)
);

/**
 * @swagger
 * /events/{id}/register:
 *   delete:
 *     summary: Отменить участие в мероприятии
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
 *         description: Успешная отмена участия
 *       400:
 *         description: Вы не зарегистрированы на это мероприятие
 *       401:
 *         description: Неавторизован
 *       500:
 *         description: Ошибка при отмене регистрации
 */
router.delete(
  '/:id/register',
  passport.authenticate("jwt", { session: false }),
  (req, res) => void EventController.unregisterFromEvent(req, res)
);

export default  router;