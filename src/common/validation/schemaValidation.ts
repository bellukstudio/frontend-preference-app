import { z } from "zod";

export const loginValidationSchema = z.object({
    username: z.string().nonempty(),
    password: z.string().min(6)
})
export const registerValidationSchema = z.object({
    username: z.string().nonempty(),    
    password: z.string().min(6)
})
