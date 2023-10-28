import { TodoBoard } from '@/_components/TodoBoard/TodoBoard'
import { GetTodosType } from '@/services/server/GetTodos'

import Layout from './layout'

import type { NextPageWithLayout } from 'next'

const todos: GetTodosType = [
  {
    id: '1',
    order: 1,
    status: 'new',
    title: 'title',
    description: 'description',
    deadline: '2021-01-01',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
  {
    id: '2',
    order: 2,
    status: 'new',
    title: 'title',
    description: 'description',
    deadline: '2021-01-01',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
  {
    id: '3',
    order: 1,
    status: 'doing',
    title: 'title',
    description: 'description',
    deadline: '2021-01-01',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
]

const BoardPage: NextPageWithLayout = () => {
  return <TodoBoard todos={todos} />
}
BoardPage.getLayout = (page) => <Layout>{page}</Layout>

export default BoardPage
