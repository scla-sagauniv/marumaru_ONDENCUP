

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/_components/ui/tabs'
import { TodoOnAppType } from '@/services/schema/todo'

import { TodoPanel } from './TodoPanel/TodoModal/TodoPanel'

// id: z.number(),
// title: z.string(),
// content: z.string().nullable(),
// startTime: z.date().nullable(),
// endTime: z.date().nullable(),
// lavel: z.string().nullable(),
// status: z.nativeEnum(Status),
// userId: z.number(),


export function TodoBoard() {
  const todos: TodoOnAppType[] = [
    {
      id: 1,
      title: 'title1',
      content: 'content1',
      startTime: new Date(),
      endTime: new Date(),
      lavel: 'lavel1',
      status: 'OPEN',
      userId: 1,
    },
    {
      id: 2,
      title: 'title2',
      content: 'content2',
      startTime: new Date(),
      endTime: new Date(),
      lavel: 'lavel2',
      status: 'DOING',
      userId: 2,
    },
    {
      id: 3,
      title: 'title3',
      content: 'content3',
      startTime: new Date(),
      endTime: new Date(),
      lavel: 'lavel3',
      status: 'DONE',
      userId: 3,
    },

  ]
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
