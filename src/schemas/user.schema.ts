import { z } from "zod";

export const postUserSchema = z.object({
    username: z.string().max(50),
    idInstitution: z.string().max(255)
}).strict()