import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/_components/ui/tabs'
import { GetTodosType } from '@/services/server/GetTodos'

import { TodoPanel } from './TodoPanel/TodoPanel'

type TodoBoardProps = {
  todos: GetTodosType
}
export function TodoBoard({ todos }: TodoBoardProps) {
  return (
    <Tabs defaultValue='panel' className='w-full h-full'>
      <TabsList className='grid w-1/3 grid-cols-2 bg-zinc-700'>
        <TabsTrigger value='panel'>Panel View</TabsTrigger>
        <TabsTrigger value='table'>Table View</TabsTrigger>
      </TabsList>
      <TabsContent value='panel' className='h-full '>
        <TodoPanel todos={todos} />
      </TabsContent>
      <TabsContent value='table' className='h-full '>
        <TodoPanel todos={todos} />
      </TabsContent>
    </Tabs>
  )
}
