import Redis from 'ioredis'
import nextSession from 'next-session'
import { promisifyStore } from 'next-session/lib/compat'

import { UserOnAppType } from '@/services/schema/user'

const RedisStore = require('connect-redis').default

export type AppSession = {
  user?: UserOnAppType
}

type NextSessionInstance = ReturnType<typeof nextSession>
type GetSessionArgs = Parameters<NextSessionInstance>
type GetSessionReturn = Pick<Awaited<ReturnType<NextSessionInstance>>, 'cookie' | 'id'>

export const getSession: (
  ...args: GetSessionArgs
) => Promise<GetSessionReturn & AppSession> = nextSession({
  store: promisifyStore(
    new RedisStore({
      client: new Redis(),
    }),
  ),
  cookie: {
    maxAge: 30 * 24 * 60 * 60,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  },
})
