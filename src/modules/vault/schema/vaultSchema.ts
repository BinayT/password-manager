import { z } from 'zod';

export const vaultSchema = z.object({
    title: z.string().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    notes: z.string().optional(),
    url: z.string().optional(),
}).strict();
