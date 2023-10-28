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
