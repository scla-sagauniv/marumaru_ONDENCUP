import * as z from 'zod'

import { UserOnApp } from '../user'

export const SignUpReq = z.object({
  name: z.string().min(3, 'Username must be at least 3 characters.'),
  email: z.string().email('Invalid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
})
export type SignUpReqType = z.infer<typeof SignUpReq>

export const SignUpRes = z.object({
  isSuccessful: z.boolean(),
  message: z.string(),
})
export type SignUpResType = z.infer<typeof SignUpRes>

export const ConfirmEmailReq = z.object({
  token: z.string(),
})
export type ConfirmEmailReqType = z.infer<typeof ConfirmEmailReq>

export const ConfirmEmailRes = z.object({
  user: UserOnApp,
})
export type ConfirmEmailResType = z.infer<typeof ConfirmEmailRes>
