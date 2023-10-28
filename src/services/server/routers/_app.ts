import { z } from 'zod'

import { procedure, router } from '@/services/server/trpc'

import { authRouter } from './auth'
import { todoRouter } from './todo'
import { userRouter } from './userInfo'

export const appRouter = router({
  healthcheck: procedure
    .input(
      z.object({
        name: z.string().optional(),
      }),
    )
    .query((opts) => {
      {
        return { greeting: `Hello ${opts.input.name ?? 'World'}!` }
      }
    }),
  auth: authRouter,
  todo: todoRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
