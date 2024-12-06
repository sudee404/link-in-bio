import * as z from "zod"

export const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*()_+-=]/, "Password must contain at least one special character"),
  account_type: z.enum(["personal", "business"]),
  business_name: z.string().optional()
})

export type SignUpInput = z.infer<typeof signUpSchema>
