import { z } from 'zod'

import { UserOnApp } from '../user'

export const UpdateUserInfoReq = z.object({
  name: z.string().min(1),
  avatarUrl: z.string(),
})

export type UpdateUserInfoReqType = z.infer<typeof UpdateUserInfoReq>

export const UpdateUserInfoRes = z.object({
  user: UserOnApp,
})

export type UpdateUserInfoResType = z.infer<typeof UpdateUserInfoRes>
