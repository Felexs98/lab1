const express = require('express');
const passport = require('passport');
const EventController = require('../controllers/EventController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Управление мероприятиями (публичные и авторизованные маршруты)
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Получить список всех мероприятий
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Список всех мероприятий
 */
router.get('/', EventController.getAllEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Получить информацию о мероприятии по ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Информация о мероприятии
 */
router.get('/:id', EventController.getEventById);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Создать новое мероприятие
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 */
router.post('/', passport.authenticate('jwt', { session: false }), EventController.createEvent);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Обновить мероприятие по ID
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), EventController.updateEvent);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Удалить мероприятие по ID
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), EventController.deleteEvent);

module.exports = router;
