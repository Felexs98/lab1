const express = require('express');
const { Event } = require('../models'); // Импорт модели Event
const { Op } = require('sequelize');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API для управления мероприятиями
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Получить список всех мероприятий
 *     tags: [Events]
 *     security:
 *       - ApiKeyAuth: []        # Вот тут говорим, что нужен ключ
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
 *   post:
 *     summary: Создать новое мероприятие
 *     tags: [Events]
 *     security:
 *       - ApiKeyAuth: []        # Вот тут говорим, что нужен ключ
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
 *               - createdBy
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Концерт"
 *               description:
 *                 type: string
 *                 example: "Лучшие хиты"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-10"
 *               category:
 *                 type: string
 *                 enum: ["концерт", "лекция", "выставка", "семинар", "фестиваль"]
 *               createdBy:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Мероприятие создано
 *       400:
 *         description: Ошибка валидации
 */
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
 *       - ApiKeyAuth: []        # Вот тут говорим, что нужен ключ
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

router.post('/', async (req, res) => {
    try {
        const { title, description, date, category, createdBy } = req.body;

        if (!title || !date || !category || !createdBy) {
            return res.status(400).json({ error: 'Поля title, date, category и createdBy обязательны' });
        }

        if (!/^[0-9a-fA-F-]{36}$/.test(createdBy)) {
            return res.status(400).json({ error: 'Поле createdBy должно быть валидным UUID' });
        }

        const validCategories = ['концерт', 'лекция', 'выставка', 'семинар', 'фестиваль'];
        if (!validCategories.includes(category)) {
            return res.status(400).json({ error: `Категория должна быть одной из: ${validCategories.join(', ')}` });
        }

        const newEvent = await Event.create({ title, description, date, category, createdBy });
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании мероприятия', details: error.message });
    }
});

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Обновить мероприятие
 *     tags: [Events]
 *     security:
 *       - ApiKeyAuth: []        # Вот тут говорим, что нужен ключ
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID мероприятия
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
 *                 enum: ["концерт", "лекция", "выставка", "семинар", "фестиваль"]
 *     responses:
 *       200:
 *         description: Мероприятие обновлено
 *       404:
 *         description: Мероприятие не найдено
 */
router.put('/:id', async (req, res) => {
    try {
        const { title, description, date, category } = req.body;
        const event = await Event.findByPk(req.params.id);

        if (!event) {
            return res.status(404).json({ error: 'Мероприятие не найдено' });
        }

        if (category) {
            const validCategories = ['концерт', 'лекция', 'выставка', 'семинар', 'фестиваль'];
            if (!validCategories.includes(category)) {
                return res.status(400).json({ error: `Категория должна быть одной из: ${validCategories.join(', ')}` });
            }
        }

        await event.update({ title, description, date, category });
        res.status(200).json({ message: 'Мероприятие обновлено', event });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении мероприятия', details: error.message });
    }
});

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Удалить мероприятие
 *     tags: [Events]
 *     security:
 *       - ApiKeyAuth: []        # Вот тут говорим, что нужен ключ
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
 *         description: Мероприятие удалено
 *       404:
 *         description: Мероприятие не найдено
 */
router.delete('/:id', async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Мероприятие не найдено' });
        }

        await event.destroy();
        res.status(200).json({ message: 'Мероприятие удалено' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении мероприятия', details: error.message });
    }
});

module.exports = router;
