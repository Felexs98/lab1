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
 *       - BearerAuth: []
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
 *       403:
 *         description: Доступ запрещён (пользователь не владеет мероприятием)
 *       404:
 *         description: Мероприятие не найдено
 */
router.put('/:id', async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);

        if (!event) {
            return res.status(404).json({ error: 'Мероприятие не найдено' });
        }

        // Проверка, что пользователь является владельцем
        if (event.createdBy !== req.user.id) {
            return res.status(403).json({ error: 'Вы не можете редактировать это мероприятие' });
        }

        await event.update(req.body);
        res.status(200).json({ message: 'Мероприятие обновлено', event });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении мероприятия', details: error.message });
    }
});

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Удалить мероприятие по ID
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Мероприятие удалено
 *       403:
 *         description: Доступ запрещён (пользователь не владеет мероприятием)
 *       404:
 *         description: Мероприятие не найдено
 */
router.delete('/:id', async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);

        if (!event) {
            return res.status(404).json({ error: 'Мероприятие не найдено' });
        }

        // Проверка, что пользователь является владельцем
        if (event.createdBy !== req.user.id) {
            return res.status(403).json({ error: 'Вы не можете удалить это мероприятие' });
        }

        await event.destroy();
        res.status(200).json({ message: 'Мероприятие удалено' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении мероприятия', details: error.message });
    }
});

module.exports = router;
