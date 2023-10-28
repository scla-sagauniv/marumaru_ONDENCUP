import '@/styles/globals.css'
import { AppPropsWithLayout } from 'next/app'

import { trpc } from '@/utils/trpc'

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(<Component {...pageProps} />)
}

export default trpc.withTRPC(MyApp)
