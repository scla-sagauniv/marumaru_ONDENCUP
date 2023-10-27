import * as z from 'zod'

import { UserOnApp } from '../user'

export const SignInReq = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
})
export type SignInReqType = z.infer<typeof SignInReq>

export const SignInRes = z.object({
  user: UserOnApp,
})
export type SignInResType = z.infer<typeof SignInRes>
