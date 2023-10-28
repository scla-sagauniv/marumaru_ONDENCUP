import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import { SuperJSON } from 'superjson'

import type { AppRouter } from '@/services/server/routers/_app'

function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return ''
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    const { ctx } = opts
    if (typeof window !== 'undefined') {
      return {
        links: [
          httpBatchLink({
            url: '/api/trpc',
          }),
        ],
        transformer: SuperJSON,
      }
    }
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          // You can pass any HTTP headers you wish here
          async headers() {
            if (!ctx?.req?.headers) {
              return {}
            }
            return {
              cookie: ctx.req.headers.cookie,
            }
          },
        }),
      ],
      transformer: SuperJSON,
    }
  },
  ssr: true,
})
