import { Router } from "express";
import { createBusiness, addStaff } from "./business.controller";
import { businessContextMiddleware } from "../../middlewares/business.middleware";
import { requireRoles } from "../../middlewares/role.guard";
import { validate } from "../../middlewares/validation";
import { createBusinessSchema, addStaffSchema } from "./business.validation";
import { asyncWrapper } from "../../utils/asyncWrapper";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createBusinessSchema),
  asyncWrapper(createBusiness)
);

router.post(
  "/add",
  authMiddleware,
  businessContextMiddleware,
  requireRoles(["owner"]),
  validate(addStaffSchema),
  asyncWrapper(addStaff)
);

export default router;
