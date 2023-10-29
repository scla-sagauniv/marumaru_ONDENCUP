import { getSession, redisClient } from './lib/session'
import { prisma } from './prisma'

import type { CreateNextContextOptions } from '@trpc/server/adapters/next'

export const createContext = async (opts: CreateNextContextOptions) => {
  const session = await getSession(opts.req, opts.res)
  return {
    prisma,
    session,
    redisClient,
    ...opts,
  }
}
