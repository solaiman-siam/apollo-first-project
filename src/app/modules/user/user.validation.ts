import { z } from "zod";



const useValidationSchema = z.object({
    id: z.string(),
    password: z.string().max(20, {message: 'password cannot be more than 20 characters'}),
    status: z.enum(["in-progress", "blocked"]).default("in-progress"),
    role: z.enum(['student', 'faculty', 'admin']),
    needsPasswordChange: z.boolean().default(false).optional(),
    isDeleted: z.boolean().default(false).optional()
})

export const userValidation = {
    useValidationSchema
}