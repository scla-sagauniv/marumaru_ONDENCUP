import * as trpcNext from '@trpc/server/adapters/next'

import { createContext } from '@/services/server/context'
import { appRouter } from '@/services/server/routers/_app'

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
})
