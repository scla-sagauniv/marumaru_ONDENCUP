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

export const redisClient = new Redis(
  process.env.REDIS_URL ? `${process.env.REDIS_URL}/0` : 'redis://127.0.0.1:6379/0',
)

export const getSession: (
  ...args: GetSessionArgs
) => Promise<GetSessionReturn & AppSession> = nextSession({
  store: promisifyStore(
    new RedisStore({
      client: redisClient,
    }),
  ),
  cookie: {
    maxAge: 30 * 24 * 60 * 60,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  },
})
