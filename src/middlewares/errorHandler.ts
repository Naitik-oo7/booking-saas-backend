import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";
import {
  UniqueConstraintError,
  ForeignKeyConstraintError,
  ValidationError,
  DatabaseError,
  TimeoutError,
} from "sequelize";

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      code: "VALIDATION_ERROR",
      message: "Validation failed",
      errors: err.flatten(),
    });
  }

  if (err instanceof UniqueConstraintError) {
    return res.status(409).json({
      success: false,
      code: "UNIQUE_CONSTRAINT",
      message: "Resource already exists",
    });
  }

  if (err instanceof ForeignKeyConstraintError) {
    return res.status(400).json({
      success: false,
      code: "FOREIGN_KEY_VIOLATION",
      message: "Invalid reference",
    });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      code: "MODEL_VALIDATION_ERROR",
      message: err.message,
    });
  }

  if (err instanceof TimeoutError) {
    return res.status(503).json({
      success: false,
      code: "DATABASE_TIMEOUT",
      message: "Database timeout",
    });
  }

  if (err instanceof DatabaseError) {
    return res.status(500).json({
      success: false,
      code: "DATABASE_ERROR",
      message: "Database error",
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      code: err.code,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal server error",
  });
}
