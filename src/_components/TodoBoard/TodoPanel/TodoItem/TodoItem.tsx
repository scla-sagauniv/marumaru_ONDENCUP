import { Calendar } from 'lucide-react'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/_components/ui/card'
import { GetTodoType } from '@/services/server/GetTodos'

type TodoItemProps = {
  todo: GetTodoType
}
export const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <Card className='w-full my-5 bg-zinc-800 border-zinc-600 text-slate-100'>
      <CardHeader>
        <CardTitle>{todo.id}</CardTitle>
        <h4 className='text-sm text-slate-100'>Details</h4>
        <CardDescription>{todo.description}</CardDescription>
      </CardHeader>
      <CardFooter className='flex justify-between'>
        <h4 className='text-sm text-slate-100'>Deadline</h4>
        <p>
          <Calendar /> {todo.deadline}
        </p>
      </CardFooter>
    </Card>
  )
}
