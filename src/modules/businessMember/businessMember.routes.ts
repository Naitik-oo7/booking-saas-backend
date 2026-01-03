import { Router } from "express";
import {
  getBusinessMembers,
  removeBusinessMember,
  updateBusinessMemberRole,
} from "./businessMember.controller";
import { authMiddleware } from "../../middlewares/auth";
import { businessContextMiddleware } from "../../middlewares/business.middleware";
import { requireRoles } from "../../middlewares/role.guard";

import { asyncWrapper } from "../../utils/asyncWrapper";

const router = Router();

// Get all business members
router.get(
  "/",
  authMiddleware,
  businessContextMiddleware,
  asyncWrapper(getBusinessMembers)
);

// Update member role (owner only)
router.patch(
  "/:memberId",
  authMiddleware,
  businessContextMiddleware,
  requireRoles(["owner"]),
  asyncWrapper(updateBusinessMemberRole)
);

// Remove member (owner only)
router.delete(
  "/:memberId",
  authMiddleware,
  businessContextMiddleware,
  requireRoles(["owner"]),
  asyncWrapper(removeBusinessMember)
);

export default router;
