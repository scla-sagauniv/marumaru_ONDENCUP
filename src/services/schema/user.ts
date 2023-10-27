import { z } from 'zod'

export const UserOnApp = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  avatarUrl: z.string(),
})
export type UserOnAppType = z.infer<typeof UserOnApp>
