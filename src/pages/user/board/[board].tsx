import { TodoBoard } from '@/_components/TodoBoard/TodoBoard'

import Layout from './layout'

import type { NextPageWithLayout } from 'next'

const BoardPage: NextPageWithLayout = () => {
  // const router = useRouter()
  return <TodoBoard />
}
BoardPage.getLayout = (page) => <Layout>{page}</Layout>

export default BoardPage
