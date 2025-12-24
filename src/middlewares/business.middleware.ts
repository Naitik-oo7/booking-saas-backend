import { Request, Response, NextFunction } from "express";
import Business from "../modules/business/business.model";
import BusinessMember from "../modules/businessMember/businessMember.model";

export async function businessContextMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const businessId = Number(req.headers["x-business-id"]);

  if (!businessId) {
    res.status(400).json({ message: "Business context required" });
    return;
  }

  const business = await Business.findByPk(businessId);

  if (!business || business.status !== "active") {
    res.status(403).json({ message: "Business inactive" });
    return;
  }

  const member = await BusinessMember.findOne({
    where: {
      businessId,
      userId: (req as any).user.id,
      status: "active",
    },
  });

  if (!member) {
    res.status(403).json({ message: "Not a business member" });
    return;
  }

  // attach business context
  (req as any).businessContext = {
    businessId,
    role: member.role,
  };

  next();
}
