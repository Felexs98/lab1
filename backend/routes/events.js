const express = require('express');
const { Event } = require('../models'); // Импортируем модель мероприятия
const { Op } = require('sequelize');

const router = express.Router();

// Получение списка всех мероприятий (GET /events)
router.get('/', async (req, res) => {
    try {
        const events = await Event.findAll();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера', details: error.message });
    }
});

//  Получение одного мероприятия по ID (GET /events/:id)
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

//  Создание нового мероприятия (POST /events)
router.post('/', async (req, res) => {
    try {
        const { title, description, date, createdBy } = req.body;

        // Проверяем, переданы ли обязательные поля
        if (!title || !date || !createdBy) {
            return res.status(400).json({ error: 'Поля title, date и createdBy обязательны' });
        }

        // Проверяем, является ли `createdBy` UUID
        if (!/^[0-9a-fA-F-]{36}$/.test(createdBy)) {
            return res.status(400).json({ error: 'Поле createdBy должно быть валидным UUID' });
        }

        const newEvent = await Event.create({ title, description, date, createdBy });
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании мероприятия', details: error.message });
    }
});

//  Обновление мероприятия (PUT /events/:id)
router.put('/:id', async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const event = await Event.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Мероприятие не найдено' });
        }

        await event.update({ title, description, date });
        res.status(200).json({ message: 'Мероприятие обновлено', event });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении мероприятия', details: error.message });
    }
});

//  Удаление мероприятия (DELETE /events/:id)
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
