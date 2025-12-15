import { Request, Response } from "express";
import User from "./user.model";
import { AppError } from "../../utils/AppError";

export const getAllUsers = async (_: Request, res: Response) => {
  const users = await User.findAll({ attributes: { exclude: ["password"] } });
  return res.json({ success: true, data: users });
};

export const createUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  const exists = await User.findOne({ where: { email } });
  if (exists) throw new AppError("Email already exists", 409, "EMAIL_EXISTS");

  const user = await User.create(req.body);
  const data = user.toJSON();
  delete (data as any).password;

  return res.status(201).json({ success: true, data });
};
