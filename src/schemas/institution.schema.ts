import { z } from "zod";

export const postInstitutionSchema = z.object({
    name: z.string().min(3).max(100),
    isBosch: z.boolean()
}).strict()

export const updateInstitutionSchema = z.object({
    name: z.string().min(3).max(100).optional(),
    isBosch: z.boolean().optional()
}).strict()