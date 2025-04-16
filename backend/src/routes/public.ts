import express, { Request, Response, Router } from "express";
import Event from "@models/Event";

const router: Router = express.Router();

router.get("/events", async (_req: Request, res: Response): Promise<void> => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error: any) {
    res.status(500).json({ error: "Ошибка сервера", details: error.message });
  }
});

router.get(
  "/events/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const event = await Event.findByPk(req.params.id);
      if (!event) {
        res.status(404).json({ error: "Мероприятие не найдено" });
        return;
      }
      res.status(200).json(event);
    } catch (error: any) {
      res.status(500).json({ error: "Ошибка сервера", details: error.message });
    }
  },
);

export default router;
