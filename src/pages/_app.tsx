import '@/styles/globals.css'
import { AppPropsWithLayout } from 'next/app'
import { Provider } from 'react-redux'

import { store } from '@/lib/state/store'
import { trpc } from '@/utils/trpc'

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  return <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
}

export default trpc.withTRPC(MyApp)
