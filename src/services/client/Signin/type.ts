import * as z from 'zod'

export const SignInSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
})
export type SignInSchemaType = z.infer<typeof SignInSchema>
