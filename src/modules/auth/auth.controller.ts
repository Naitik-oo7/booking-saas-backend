import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../users/user.model";
import { signAccessToken } from "../../utils/jwt";
import { AppError } from "../../utils/AppError";

// Use async to handle DB operations properly and avoid race conditions
export async function signup(req: Request, res: Response): Promise<void> {
  const { email, password, firstName, lastName } = req.body;

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    throw new AppError("Email already registered", 400, "EMAIL_EXISTS");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    passwordHash,
  });

  const token = signAccessToken(user.id);

  res.status(201).json({
    success: true,
    data: {
      token,
      user: { id: user.id, email: user.email },
    },
  });
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new AppError("Invalid credentials", 401, "INVALID_CREDENTIALS");
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    throw new AppError("Invalid credentials", 401, "INVALID_CREDENTIALS");
  }

  const token = signAccessToken(user.id);

  res.json({
    success: true,
    data: {
      token,
      user: { id: user.id, email: user.email },
    },
  });
}
