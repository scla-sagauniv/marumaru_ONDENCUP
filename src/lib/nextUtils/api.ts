import { NextApiHandler } from 'next'
export type ApiHandler<T> = NextApiHandler<T | Error>
