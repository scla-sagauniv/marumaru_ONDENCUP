import { z } from 'zod'

import { procedure, router } from '@/services/server/trpc'

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
})

export type AppRouter = typeof appRouter
