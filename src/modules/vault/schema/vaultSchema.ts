import { z } from 'zod';

export const vaultSchema = z.object({
    title: z.string(),
    username: z.string(),
    password: z.string(),
    notes: z.string(),
    url: z.string(),
    user_id: z.string(),
});
