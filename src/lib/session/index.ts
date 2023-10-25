import RedisStoreFactory from 'connect-redis'
import Redis from 'ioredis'
import nextSession from 'next-session'
import { expressSession, promisifyStore } from 'next-session/lib/compat'

const RedisStore = RedisStoreFactory(expressSession)

export type AppSession = {
  name?: string
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
