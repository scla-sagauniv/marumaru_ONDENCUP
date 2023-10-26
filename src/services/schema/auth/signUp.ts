import * as z from 'zod'

import { UserOnApp } from '../user'

export const SignUpReq = z.object({
  name: z.string().min(3, 'Username must be at least 3 characters.'),
  email: z.string().email('Invalid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
})
export type SignUpReqType = z.infer<typeof SignUpReq>

export const SignUpRes = z.object({
  user: UserOnApp,
})
export type SignUpResType = z.infer<typeof SignUpRes>
