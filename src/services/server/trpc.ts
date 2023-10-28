import { initTRPC } from '@trpc/server'
import { SuperJSON } from 'superjson'

import { createContext } from './context'

const t = initTRPC.context<typeof createContext>().create({
  transformer: SuperJSON,
})

export const router = t.router
export const procedure = t.procedure
