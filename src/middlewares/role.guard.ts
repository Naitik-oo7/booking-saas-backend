import { Request, Response, NextFunction } from "express";

export function requireOwner(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if ((req as any).businessContext.role !== "owner") {
    res.status(403).json({ message: "Owner access required" });
    return;
  }
  next();
}

export function requireStaff(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const role = (req as any).businessContext.role;
  if (role !== "owner" && role !== "staff" && role !== "manager") {
    res.status(403).json({ message: "Staff access required" });
    return;
  }
  next();
}
