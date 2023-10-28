import * as z from 'zod'

export const CreatePasswordResetUrlReq = z.object({
  email: z.string().email('Invalid email address.'),
})
export type CreatePasswordResetUrlReqType = z.infer<typeof CreatePasswordResetUrlReq>

export const CreatePasswordResetUrlRes = z.object({
  isSuccessful: z.boolean(),
  message: z.string(),
})
export type CreatePasswordResetUrlResType = z.infer<typeof CreatePasswordResetUrlRes>

export const ResetPasswordReq = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
  token: z.string(),
})
export type ResetPasswordReqType = z.infer<typeof ResetPasswordReq>

export const ResetPasswordRes = z.object({
  isSuccessful: z.boolean(),
  message: z.string(),
})
export type ResetPasswordResType = z.infer<typeof ResetPasswordRes>
