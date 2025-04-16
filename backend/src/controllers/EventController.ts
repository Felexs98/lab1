import { Request, Response } from "express";
import Event from "../models/Event";
import { formatDate } from "../utils/formatDate";

class EventController {
  static async getAllEvents(req: Request, res: Response): Promise<Response> {
    try {
      const events = await Event.findAll();

      const formatted = events.map((event) => ({
        ...event.toJSON(),
        date: formatDate(event.date),
      }));

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
}

export default EventController;
