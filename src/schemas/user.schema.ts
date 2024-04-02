import { z } from "zod";

export const postUserSchema = z.object({
    username: z.string().max(50),
    idInstitution: z.string().max(255),
}).strict()

export const updateUserSchema = z.object({
    username: z.string().max(50).optional(),
    password: z.string().min(8).max(50).optional(),
    name: z.string().max(255).optional(),
    email: z.string().email().max(255).optional(),
    contact: z.string().min(8).regex(/^\(\d{2}\)\d{5}-\d{4}$/).optional(),
    dateOfBirth: z.string().min(10).regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
}).strict()