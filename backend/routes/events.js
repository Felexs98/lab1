const express = require('express');
const { Event } = require('../models');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Управление мероприятиями (требуется авторизация)
 */

/**
 * @swagger
 * /events:
<<<<<<< HEAD
 *   get:
 *     summary: Получить список всех мероприятий
 *     tags: [Events]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: ["концерт", "лекция", "выставка", "семинар", "фестиваль"]
 *         description: Фильтр по категории
 *     responses:
 *       200:
 *         description: Список мероприятий
=======
>>>>>>> feature/lab2
 *   post:
 *     summary: Создать новое мероприятие
 *     tags: [Events]
 *     security:
<<<<<<< HEAD
 *       - ApiKeyAuth: []
=======
 *       - BearerAuth: []
>>>>>>> feature/lab2
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
 *                 format: date
 *               category:
 *                 type: string
 *                 enum: [концерт, лекция, выставка, семинар, фестиваль]
 *     responses:
 *       201:
 *         description: Мероприятие создано
 */
<<<<<<< HEAD
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;

        let filter = {};
        if (category) {
            filter.category = category;
        }

        const events = await Event.findAll({ where: filter });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера', details: error.message });
    }
});

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Получить мероприятие по ID
 *     tags: [Events]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID мероприятия
 *     responses:
 *       200:
 *         description: Данные о мероприятии
 *       404:
 *         description: Мероприятие не найдено
 */
router.get('/:id', async (req, res) => {
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

=======
>>>>>>> feature/lab2
router.post('/', async (req, res) => {
   console.log('req.user:', req.user);
    try {
        const { title, description, date, category } = req.body;
        const createdBy = req.user.id;

        const event = await Event.create({ title, description, date, category, createdBy });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера', details: error.message });
    }
});

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Обновить мероприятие по ID
 *     tags: [Events]
 *     security:
<<<<<<< HEAD
 *       - ApiKeyAuth: []
=======
 *       - BearerAuth: []
>>>>>>> feature/lab2
 *     parameters:
 *       - in: path
 *         name: id
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
 *                 format: date
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Мероприятие обновлено
 */
router.put('/:id', async (req, res) => {
    // Логика обновления
});

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Удалить мероприятие по ID
 *     tags: [Events]
 *     security:
<<<<<<< HEAD
 *       - ApiKeyAuth: []
=======
 *       - BearerAuth: []
>>>>>>> feature/lab2
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Мероприятие удалено
 */
router.delete('/:id', async (req, res) => {
    // Логика удаления
});

module.exports = router;
