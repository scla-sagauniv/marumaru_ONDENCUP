import * as React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/_components/ui/card'
import { GetTodosType } from '@/services/server/GetTodos'

import { TodoItem } from './TodoItem'

type TodoBoardProps = {
  todos: GetTodosType
}
export function TodoPanel({ todos }: TodoBoardProps) {
  return (
    <div className='grid grid-cols-3 gap-4 h-full '>
      <Card className='p-6 bg-zinc-700 text-slate-100 border-none'>
        <CardHeader>
          <CardTitle>🐣New</CardTitle>
        </CardHeader>
        <CardContent>
          {todos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </CardContent>
      </Card>
      <Card className='p-6 bg-zinc-700 text-slate-100 border-none'>
        <CardHeader>
          <CardTitle>🏗️Doing</CardTitle>
        </CardHeader>
        <CardContent>
          {todos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </CardContent>
      </Card>
      <Card className='p-6 bg-zinc-700 text-slate-100 border-none'>
        <CardHeader>
          <CardTitle>💯Done</CardTitle>
        </CardHeader>
        <CardContent>
          {todos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
