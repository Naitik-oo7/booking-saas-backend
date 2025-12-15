import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export default function notFound(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next(new AppError("Route not found", 404, "ROUTE_NOT_FOUND"));
}
