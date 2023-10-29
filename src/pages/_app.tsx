import '@/styles/globals.css'
import { AppPropsWithLayout } from 'next/app'

import ReduxProvider from '@/lib/state/provider'
import { trpc } from '@/utils/trpc'

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  return <ReduxProvider>{getLayout(<Component {...pageProps} />)}</ReduxProvider>
}

export default trpc.withTRPC(MyApp)
