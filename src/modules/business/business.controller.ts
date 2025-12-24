import { Request, Response } from "express";
import Business from "./business.model";
import BusinessMember from "../businessMember/businessMember.model";
import { AppError } from "../../utils/AppError";
import User from "../users/user.model";

export async function createBusiness(
  req: Request,
  res: Response
): Promise<void> {
  const { name, timezone } = req.body;
  const user = (req as any).user;

  const business = await Business.create({
    name,
    timezone,
    ownerId: user.id,
  });

  await BusinessMember.create({
    userId: user.id,
    businessId: business.id,
    role: "owner",
  });

  res.status(201).json({
    success: true,
    data: {
      businessId: business.id,
      name: business.name,
    },
  });
  return;
}

export async function addStaff(req: Request, res: Response): Promise<void> {
  const { email, role } = req.body;
  const { businessId } = (req as any).businessContext;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new AppError("User not found", 404, "USER_NOT_FOUND");
  }

  const exists = await BusinessMember.findOne({
    where: { userId: user.id, businessId },
  });

  if (exists) {
    throw new AppError("User already a member", 400, "USER_ALREADY_MEMBER");
  }

  await BusinessMember.create({
    userId: user.id,
    businessId,
    role,
  });

  res.status(201).json({
    success: true,
    data: { message: "Staff added" },
  });
  return;
}
