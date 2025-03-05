const express = require('express');
const { Event } = require('../models');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Public
 *   description: Публичные маршруты для просмотра мероприятий
 */

/**
 * @swagger
 * /public/events:
 *   get:
 *     summary: Получить список всех мероприятий
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: Список всех мероприятий
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *                   category:
 *                     type: string
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/events', async (req, res) => {
    try {
        const events = await Event.findAll();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера', details: error.message });
    }
});

/**
 * @swagger
 * /public/events/{id}:
 *   get:
 *     summary: Получить информацию о мероприятии по ID
 *     tags: [Public]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Информация о мероприятии
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *                   category:
 *                     type: string
 *       404:
 *         description: Мероприятие не найдено
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/events/:id', async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Мероприятие не найдено' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера', details: error.message });
    }
});

module.exports = router;
