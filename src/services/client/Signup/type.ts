import * as z from 'zod'

export const SignUpSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters.'),
  email: z.string().email('Email address is invalid.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
})
export type SignUpSchemaType = z.infer<typeof SignUpSchema>
