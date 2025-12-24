import { body, param } from "express-validator";

export const updateMemberRoleSchema = [
  param("memberId").isInt().withMessage("Member ID must be an integer"),
  body("role")
    .isIn(["manager", "staff"])
    .withMessage("Role must be either 'manager' or 'staff'"),
];

export const removeMemberSchema = [
  param("memberId").isInt().withMessage("Member ID must be an integer"),
];