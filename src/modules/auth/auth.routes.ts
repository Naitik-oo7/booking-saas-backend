import express from "express";
import { login, signup } from "./auth.controller";
import { asyncWrapper } from "../../utils/asyncWrapper";
import { validate } from "../../middlewares/validation";
import { z } from "zod";

const router = express.Router();

const registerSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post("/signup", validate(registerSchema), asyncWrapper(signup));
router.post("/login", validate(loginSchema), asyncWrapper(login));

export default router;
