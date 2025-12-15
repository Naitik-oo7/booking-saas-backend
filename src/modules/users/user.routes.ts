import express from "express";
import { getAllUsers, createUser } from "./user.controller";
import { validate } from "../../middlewares/validation";
import { createUserSchema } from "./user.validation";
import { asyncWrapper } from "../../utils/asyncWrapper";
import { requireAuth } from "middlewares/auth";

const router = express.Router();

router.get("/", requireAuth, asyncWrapper(getAllUsers));
router.post("/", validate(createUserSchema), asyncWrapper(createUser));

export default router;
