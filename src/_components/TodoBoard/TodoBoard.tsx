import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/_components/ui/tabs'
import { TodoOnAppType } from '@/services/schema/todo'

import { TodoPanel } from './TodoPanel/TodoModal/TodoPanel'

// id: z.number(),
// title: z.string(),
// content: z.string().nullable(),
// startTime: z.date().nullable(),
// endTime: z.date().nullable(),
// label: z.string().nullable(),
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
      label: 'label1',
      status: 'OPEN',
      order: 1,
      userId: 1,
    },
    {
      id: 2,
      title: 'title2',
      content: 'content2',
      startTime: new Date(),
      endTime: new Date(),
      label: 'label2',
      status: 'DOING',
      order: 2,
      userId: 1,
    },
    {
      id: 3,
      title: 'title3',
      content: 'content3',
      startTime: new Date(),
      endTime: new Date(),
      label: 'label3',
      status: 'DONE',
      order: 3,
      userId: 1,
    },
    {
      id: 4,
      title: 'title4',
      content: 'content4',
      startTime: new Date(),
      endTime: new Date(),
      label: 'label4',
      status: 'OVERDUE',
      order: 4,
      userId: 1,
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
