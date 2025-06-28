import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(8, "Password must be at least 8 characters long").optional(),
  username: z.string().min(3, "Username must be at least 3 characters long").trim().optional(),
});
