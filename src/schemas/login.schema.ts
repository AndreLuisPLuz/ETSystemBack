import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().max(50),
    password: z.string().max(255)
})