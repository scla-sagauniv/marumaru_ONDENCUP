import { Calendar } from 'lucide-react'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/_components/ui/card'

import { TodoFormType } from '../../TodoBoard'

type TodoItemProps = {
  id?: number
  todo?: TodoFormType
  findTodoItem?: (id: number) => TodoFormType | undefined
}

export const TodoItem = ({ todo, id, findTodoItem }: TodoItemProps) => {
  const todoItem = todo ? todo : findTodoItem!(id!)

  return (
    <>
      {todoItem && (
        <Card className='w-full my-5 bg-zinc-800 border-zinc-600 text-slate-100'>
          <CardHeader>
            <CardTitle>{todoItem.id}</CardTitle>
            <h4 className='text-sm text-slate-100'>Details</h4>
            <CardDescription>{todoItem.content}</CardDescription>
          </CardHeader>
          <CardFooter className='flex justify-between'>
            <h4 className='text-sm text-slate-100'>Deadline</h4>
            <p>
              <Calendar /> {todoItem.endTime?.toDateString()}
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
