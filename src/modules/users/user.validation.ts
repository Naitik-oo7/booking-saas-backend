import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(6),
  isActive: z.boolean().optional().default(true),
});

export const updateUserSchema = createUserSchema.partial();
