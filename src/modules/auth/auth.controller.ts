import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../users/user.model";
import { AppError } from "../../utils/AppError";

function signToken(userId: number) {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
}

// REGISTER
export const register = async (req: Request, res: Response) => {
  const { email, firstName, lastName, password } = req.body;

  const exists = await User.findOne({ where: { email } });
  if (exists) {
    throw new AppError("Email already registered", 409, "EMAIL_ALREADY_EXISTS");
  }

  const user = await User.create({
    email,
    firstName,
    lastName,
    password,
  });

  const token = signToken(user.id);

  const data = user.toJSON();
  delete (data as any).password;

  return res.status(201).json({
    success: true,
    token,
    data,
  });
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user || !(await user.validatePassword(password))) {
    throw new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS");
  }

  const token = signToken(user.id);

  const data = user.toJSON();
  delete (data as any).password;

  return res.status(200).json({
    success: true,
    token,
    data,
  });
};
