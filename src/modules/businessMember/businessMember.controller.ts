import { Request, Response } from "express";
import BusinessMember from "./businessMember.model";
import User from "../users/user.model";
import Business from "../business/business.model";
import { AppError } from "../../utils/AppError";
import { asyncWrapper } from "../../utils/asyncWrapper";

export async function getBusinessMembers(
  req: Request,
  res: Response
): Promise<void> {
  const { businessId } = (req as any).businessContext;

  const members = await BusinessMember.findAll({
    where: { businessId },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName", "email"],
      },
    ],
  });

  res.status(200).json({
    success: true,
    data: members,
  });
  return;
}

export async function removeBusinessMember(
  req: Request,
  res: Response
): Promise<void> {
  const { memberId } = req.params;
  const { businessId } = (req as any).businessContext;

  const member = await BusinessMember.findOne({
    where: { id: memberId, businessId },
  });

  if (!member) {
    throw new AppError("Member not found", 404, "MEMBER_NOT_FOUND");
  }

  // Prevent removing the owner
  if (member.role === "owner") {
    throw new AppError(
      "Cannot remove the business owner",
      400,
      "CANNOT_REMOVE_OWNER"
    );
  }

  await member.destroy();

  res.status(200).json({
    success: true,
    data: { message: "Member removed successfully" },
  });
  return;
}

export async function updateBusinessMemberRole(
  req: Request,
  res: Response
): Promise<void> {
  const { memberId } = req.params;
  const { role } = req.body;
  const { businessId } = (req as any).businessContext;

  const member = await BusinessMember.findOne({
    where: { id: memberId, businessId },
  });

  if (!member) {
    throw new AppError("Member not found", 404, "MEMBER_NOT_FOUND");
  }

  // Prevent changing the owner role
  if (member.role === "owner") {
    throw new AppError(
      "Cannot change the role of business owner",
      400,
      "CANNOT_CHANGE_OWNER_ROLE"
    );
  }

  await member.update({ role });

  res.status(200).json({
    success: true,
    data: { message: "Member role updated successfully" },
  });
  return;
}