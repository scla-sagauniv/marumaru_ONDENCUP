import { Calendar, MinusCircle } from 'lucide-react'

import { Button } from '@/_components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/_components/ui/card'
import { TodoOnAppType } from '@/services/schema/todo'

import { TodoModal } from '../TodoModal'

import { DeleteDialog } from './DeleteDialog'

type TodoItemProps = {
  todo: TodoOnAppType
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  console.log('koko👍todo is ' + todo.id)

  return (
    <>
      <DeleteDialog id={todo.id}>
        <Button
          size='icon'
          variant='secondary'
          className='relative top-10 right-[-90%] z-50 rounded-full'
        >
          <MinusCircle />
        </Button>
      </DeleteDialog>
      <TodoModal todo={todo}>
        <Card className='w-full my-5 bg-zinc-800 border-zinc-600 text-slate-100'>
          <CardHeader>
            <CardTitle>{todo.id}</CardTitle>
            <h4 className='text-sm text-slate-100'>Details</h4>
            <CardDescription>{todo.content}</CardDescription>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardFooter className='flex justify-between'>
            <h4 className='text-sm text-slate-100'>Deadline</h4>
            <p>
              <Calendar /> {todo.endTime?.toDateString()}
            </p>
          </CardFooter>
        </Card>
      </TodoModal>
    </>
  )
}
