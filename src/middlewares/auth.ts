import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import User from "../modules/users/user.model";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyAccessToken(token);

    const user = await User.findByPk(payload.userId);

    if (!user || user.status !== "active") {
      res.status(401).json({ message: "User inactive" });
      return;
    }

    // attach identity
    (req as any).user = user;

    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
}
