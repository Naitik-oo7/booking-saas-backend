import express from "express";
import { getAllUsers, createUser } from "./user.controller";
import { validate } from "../../middlewares/validation";
import { createUserSchema } from "./user.validation";
import { asyncWrapper } from "../../utils/asyncWrapper";
import { authMiddleware } from "../../middlewares/auth";

const router = express.Router();

router.get("/", authMiddleware, asyncWrapper(getAllUsers));
router.post("/", validate(createUserSchema), asyncWrapper(createUser));

export default router;
