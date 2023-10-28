import { Calendar, MinusCircle } from 'lucide-react'

import { Button } from '@/_components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/_components/ui/card'
import { GetTodoType } from '@/services/server/GetTodos'

import { TodoModal } from '../TodoModal'

import { DeleteDialog } from './DeleteDialog'

type TodoItemProps = {
  id?: string
  todo?: GetTodoType
  findTodoItem?: (id: string) => GetTodoType | undefined
}

export const TodoItem = ({ todo, id, findTodoItem }: TodoItemProps) => {
  const todoItem = todo ? todo : findTodoItem!(id!)
  return (
    <>
      {todoItem && (
        <>
          <DeleteDialog id={todoItem.id}>
            <Button
              size='icon'
              variant='secondary'
              className='relative top-10 right-[-90%] z-50 rounded-full'
            >
              <MinusCircle />
            </Button>
          </DeleteDialog>
          <TodoModal>
            <Card className=' w-full my-5 bg-zinc-800 border-zinc-600 text-slate-100'>
              <CardHeader>
                <CardTitle>{todoItem.id}</CardTitle>
                <h4 className='text-sm text-slate-100'>Details</h4>
                <CardDescription>{todoItem.description}</CardDescription>
              </CardHeader>
              <CardFooter className='flex justify-between'>
                <h4 className='text-sm text-slate-100'>Deadline</h4>
                <Calendar /> {todoItem.deadline}
              </CardFooter>
            </Card>
          </TodoModal>
        </>
      )}
    </>
  )
}
