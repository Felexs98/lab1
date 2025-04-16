import express, { Router } from "express";
import passport from "@config/passport";
import authRoutes from "./auth";
import userRoutes from "./users";
import eventRoutes from "./events";

const router: Router = express.Router();

// Подключаем маршруты
router.use("/auth", authRoutes);
router.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  userRoutes,
);
router.use("/events", eventRoutes);

export default router;
