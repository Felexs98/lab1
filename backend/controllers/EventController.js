const { Event } = require('../models');

class EventController {
    static async getAllEvents(req, res) {
        try {
            const events = await Event.findAll();
            res.status(200).json({ data: events });
        } catch (error) {
            res.status(500).json({ error: 'Ошибка сервера', details: error.message });
        }
    }

    static async getEventById(req, res) {
        try {
            const event = await Event.findByPk(req.params.id);
            if (!event) return res.status(404).json({ error: 'Мероприятие не найдено' });
            res.status(200).json({ data: event });
        } catch (error) {
            res.status(500).json({ error: 'Ошибка сервера', details: error.message });
        }
    }

    static async createEvent(req, res) {
        try {
            const { title, description, date, category } = req.body;
            const createdBy = req.user.id;

            if (isNaN(Date.parse(date))) {
                return res.status(400).json({ error: 'Неверный формат даты' });
            }

            const event = await Event.create({ title, description, date, category, createdBy });
            res.status(201).json({ data: event });
        } catch (error) {
            res.status(500).json({ error: 'Ошибка сервера', details: error.message });
        }
    }

    static async updateEvent(req, res) {
        try {
            const event = await Event.findByPk(req.params.id);
            if (!event) return res.status(404).json({ error: 'Мероприятие не найдено' });
            if (event.createdBy !== req.user.id) return res.status(403).json({ error: 'Нет прав на редактирование', id: req.params.id });

            if (req.body.date && isNaN(Date.parse(req.body.date))) {
                return res.status(400).json({ error: 'Неверный формат даты' });
            }

            await event.update(req.body);
            res.status(200).json({ message: 'Мероприятие обновлено', data: event });
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при обновлении', details: error.message });
        }
    }

    static async deleteEvent(req, res) {
        try {
            const event = await Event.findByPk(req.params.id);
            if (!event) return res.status(404).json({ error: 'Мероприятие не найдено' });
            if (event.createdBy !== req.user.id) return res.status(403).json({ error: 'Нет прав на удаление', id: req.params.id });

            await event.destroy();
            res.status(200).json({ message: 'Мероприятие удалено' });
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при удалении', details: error.message });
        }
    }
}

module.exports = EventController;
