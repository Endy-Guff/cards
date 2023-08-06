import { z } from 'zod'

export type SignInFormSchema = z.infer<typeof signInSchema>
export type SignUpFormSchema = z.infer<typeof signUpSchema>
export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordSchema>

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(3),
    confirmPassword: z.string().min(3),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
})
