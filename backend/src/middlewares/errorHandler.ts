import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (
    err instanceof SyntaxError &&
    (err as any).status === 400 &&
    "body" in err
  ) {
    console.error("Ошибка парсинга JSON:", err.message);
    res.status(400).json({
      error: "Неверный формат JSON",
      details: err.message,
    });
    return;
  }

  console.error("Внутренняя ошибка сервера:", err);
  res.status(500).json({
    error: "Внутренняя ошибка сервера",
    details: err.message,
  });
};

export default errorHandler;
