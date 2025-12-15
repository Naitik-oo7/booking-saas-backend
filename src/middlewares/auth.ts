import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "utils/AppError";

interface JwtPayload {
  userId: number;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Not authenticated", 401, "NOT_AUTHENTICATED");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = { id: decoded.userId };
    next();
  } catch {
    throw new AppError("Invalid or expired token", 401, "INVALID_TOKEN");
  }
}
