import { z } from "zod";

export const createBusinessSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  timezone: z.string().min(1, "Timezone is required"),
});

export const addStaffSchema = z.object({
  email: z.string().email("Valid email is required"),
  role: z.string().min(1, "Role is required"),
});
