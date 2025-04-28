import { Request, Response } from "express";
import Event from "@models/Event";
import { formatDate } from "@utils/formatDate";
import Participant from "@models/Participant";
import User from "@models/User";

class EventController {
  static async getAllEvents(req: Request, res: Response): Promise<Response> {
    try {
      const events = await Event.findAll({
        include: [
          {
            association: 'Participants',
            attributes: ['id'],
            through: { attributes: [] }
          }
        ]
      });

      const formatted = events.map((event) => {
        const participantsCount = event.Participants ? event.Participants.length : 0;

        return {
          ...event.toJSON(),
          participantsCount,                         // ← добавлено сюда!
          date: formatDate(event.date),
        };
      });

      return res.status(200).json({ data: formatted });
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка сервера",
        details: (error as Error).message,
      });
    }
  }

  static async getEventById(req: Request, res: Response): Promise<Response> {
    try {
      const event = await Event.findByPk(req.params.id);
      if (!event) {
        return res.status(404).json({ error: "Мероприятие не найдено" });
      }

      return res.status(200).json({
        data: {
          ...event.toJSON(),
          date: formatDate(event.date),
        },
      });
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка сервера",
        details: (error as Error).message,
      });
    }
  }

  static async createEvent(req: Request, res: Response): Promise<Response> {
    const user = req.user as Express.User;

    if (!user?.id) {
      return res.status(401).json({ message: "Неавторизован" });
    }

    const { title, description, date, category } = req.body;

    if (!title || !date || !category) {
      const missing: string[] = [];
      if (!title) missing.push("title");
      if (!date) missing.push("date");
      if (!category) missing.push("category");

      return res
        .status(400)
        .json({ error: `Отсутствуют поля: ${missing.join(", ")}` });
    }

    if (isNaN(Date.parse(date))) {
      return res.status(400).json({ error: "Неверный формат даты" });
    }

    try {
      const event = await Event.create({
        title,
        description,
        date,
        category,
        createdBy: user.id,
      });

      return res.status(201).json({
        data: {
          ...event.toJSON(),
          date: formatDate(event.date),
        },
      });
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка сервера",
        details: (error as Error).message,
      });
    }
  }

  static async updateEvent(req: Request, res: Response): Promise<Response> {
    const user = req.user as Express.User;

    if (!user?.id) {
      return res.status(401).json({ message: "Неавторизован" });
    }

    try {
      const event = await Event.findByPk(req.params.id);
      if (!event) {
        return res.status(404).json({ error: "Мероприятие не найдено" });
      }

      if (event.createdBy !== user.id) {
        return res.status(403).json({ error: "Нет прав на редактирование" });
      }

      if (req.body.date && isNaN(Date.parse(req.body.date))) {
        return res.status(400).json({ error: "Неверный формат даты" });
      }

      await event.update(req.body);

      return res.status(200).json({
        message: "Мероприятие обновлено",
        data: {
          ...event.toJSON(),
          date: formatDate(event.date),
        },
      });
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при обновлении",
        details: (error as Error).message,
      });
    }
  }

  static async deleteEvent(req: Request, res: Response): Promise<Response> {
    const user = req.user as Express.User;

    if (!user?.id) {
      return res.status(401).json({ message: "Неавторизован" });
    }

    try {
      const event = await Event.findByPk(req.params.id);
      if (!event) {
        return res.status(404).json({ error: "Мероприятие не найдено" });
      }

      if (event.createdBy !== user.id) {
        return res.status(403).json({ error: "Нет прав на удаление" });
      }

      await event.destroy();

      return res.status(200).json({ message: "Мероприятие удалено" });
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при удалении",
        details: (error as Error).message,
      });
    }
  }

  static async registerForEvent(req: Request, res: Response): Promise<Response> {
    const user = req.user as Express.User;

    if (!user?.id) {
      return res.status(401).json({ message: "Неавторизован" });
    }

    const eventId = req.params.id;

    try {
      // Проверяем, существует ли мероприятие и кто его создал
      const event = await Event.findByPk(eventId);
      if (!event) {
        return res.status(404).json({ message: "Мероприятие не найдено" });
      }

      // Если пользователь — автор мероприятия, блокируем регистрацию
      if (event.createdBy === user.id) {
        return res.status(400).json({ message: "Нельзя зарегистрироваться на своё мероприятие" });
      }

      // Проверяем, зарегистрирован ли уже пользователь
      const existing = await Participant.findOne({
        where: { eventId, userId: user.id },
      });

      if (existing) {
        return res.status(400).json({ message: "Вы уже зарегистрированы на это мероприятие" });
      }

      // Регистрируем пользователя
      await Participant.create({
        eventId,
        userId: user.id,
      });

      return res.status(201).json({ message: "Вы успешно зарегистрировались на мероприятие" });
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при регистрации",
        details: (error as Error).message,
      });
    }
  }

  static async unregisterFromEvent(req: Request, res: Response): Promise<Response> {
    const user = req.user as Express.User;

    if (!user?.id) {
      return res.status(401).json({ message: "Неавторизован" });
    }

    const eventId = req.params.id;

    try {
      const existing = await Participant.findOne({
        where: { eventId, userId: user.id },
      });

      if (!existing) {
        return res.status(400).json({ message: "Вы не зарегистрированы на это мероприятие" });
      }

      await existing.destroy();

      return res.status(200).json({ message: "Вы успешно отменили участие в мероприятии" });
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при отмене регистрации",
        details: (error as Error).message,
      });
    }
  }

  static async getParticipants(req: Request, res: Response): Promise<Response> {
    const eventId = req.params.id;

    try {
      const participants = await Participant.findAll({
        where: { eventId },
        include: [
          {
            model: User,
            attributes: ["id", "name", "email"],
          },
        ],
      });

      // Добавляем логирование количества участников
      console.log(`Мероприятие ID: ${eventId}, количество участников: ${participants.length}`);

      return res.status(200).json({ data: participants });
    } catch (error) {
      console.error(`Ошибка при получении участников для события ${eventId}:`, (error as Error).message);
      return res.status(500).json({
        error: "Ошибка при получении участников",
        details: (error as Error).message,
      });
    }
  }

}

export default EventController;
