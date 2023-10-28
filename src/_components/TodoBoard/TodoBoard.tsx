import { Status } from '@prisma/client'
import { z } from 'zod'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/_components/ui/tabs'

import { TodoPanel } from './TodoPanel/TodoModal/TodoPanel'

const formSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string().nullable(),
  startTime: z.date().nullable(),
  endTime: z.date().nullable(),
  status: z.nativeEnum(Status),
})

export type TodoFormType = z.infer<typeof formSchema>

export function TodoBoard() {
  const todos: TodoFormType[] = [
    {
      id: 1,
      status: 'OPEN',
      title: 'title',
      content: 'content',
      startTime: new Date('2021-01-01'),
      endTime: new Date('2021-01-01'),
    },
    {
      id: 2,
      status: 'OPEN',
      title: 'title',
      content: 'content',
      startTime: new Date('2021-01-01'),
      endTime: new Date('2021-01-01'),
    },
    {
      id: 3,
      status: 'OPEN',
      title: 'title',
      content: 'content',
      startTime: new Date('2021-01-01'),
      endTime: new Date('2021-01-01'),
    },
    {
      id: 4,
      status: 'OPEN',
      title: 'title',
      content: 'content',
      startTime: new Date('2021-01-01'),
      endTime: new Date('2021-01-01'),
    },
    {
      id: 5,
      status: 'OPEN',
      title: 'title',
      content: 'content',
      startTime: new Date('2021-01-01'),
      endTime: new Date('2021-01-01'),
    },
    {
      id: 6,
      status: 'OPEN',
      title: 'title',
      content: 'content',
      startTime: new Date('2021-01-01'),
      endTime: new Date('2021-01-01'),
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
