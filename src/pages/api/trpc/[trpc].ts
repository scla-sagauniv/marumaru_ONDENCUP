import * as trpcNext from '@trpc/server/adapters/next'

import { createContext } from '@/services/server/context'
import { reminderExec } from '@/services/server/reminderExec'
import { appRouter } from '@/services/server/routers/_app'

reminderExec()

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
})
