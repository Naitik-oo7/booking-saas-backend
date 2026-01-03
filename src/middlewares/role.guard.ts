import { Request, Response, NextFunction } from "express";

export function requireRoles(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes((req as any).businessContext.role)) {
      res.status(403).json({ message: "Access denied" });
      return;
    }
    next();
  };
}
