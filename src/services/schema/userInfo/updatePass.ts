import { z } from 'zod'

import { UserOnApp } from '../user'

export const UpdateUserPassReq = z.object({
  password: z.string(),
  newPassword: z.string(),
  confirmNewPassword: z.string(),
})

export type UpdateUserPassReqType = z.infer<typeof UpdateUserPassReq>

export const UpdateUserPassRes = z.object({
  user: UserOnApp,
})

export type UpdateUserPassResType = z.infer<typeof UpdateUserPassRes>
