import { Inter } from 'next/font/google'
import { useState } from 'react'

import { CreateTodoReqType, GetTodoReqType, UpdateTodoReqType, DeleteTodoReqType } from '@/services/schema/crud'
import { TodoOnAppType } from '@/services/schema/todo'
import { trpc } from '@/utils/trpc'

const inter = Inter({ subsets: ['latin'] })


export default function ApiDemoPage2() {
  const [createTodoInfo, setCreateTodoInfo] = useState<TodoOnAppType | null>(null)
  const [updateTodoInfo, setUpdateTodoInfo] = useState<TodoOnAppType | null>(null)
  const [deleteTodoInfo, setDeleteTodoInfo] = useState<TodoOnAppType | null>(null)

  const [createTodoParam, setCreateTodoParam] = useState<CreateTodoReqType>({
    title: '',
    content: '',
    startTime: null,
    endTime: null,
    lavel: '',
    userId: -1,
  })
  const getTodoParam: GetTodoReqType = {
    id: 1,
  }
  const [updateTodoParam, setUpdateTodoParam] = useState<UpdateTodoReqType>({
    id: -1,
    title: '',
    content: '',
    startTime: null,
    endTime: null,
    lavel: '',
    status: 'OPEN',
  })
  const [deleteTodoParam, setDeleteTodoParam] = useState<DeleteTodoReqType>({
    id: -1,
  })
  
  const createTodoMutation = trpc.todo.createTodo.useMutation()
  const onCreateTodo = async () => {
    const res = await createTodoMutation.mutateAsync(createTodoParam)
    console.log(res)
    setCreateTodoInfo(res.todo)
  } 
  const todos = trpc.todo.getTodo.useQuery(getTodoParam)
  console.log('todos',todos)

  const updateTodoMutation = trpc.todo.updateTodo.useMutation()
  const onUpdateTodo = async () => {
    const res = await updateTodoMutation.mutateAsync(updateTodoParam)
    console.log(res)
    setUpdateTodoInfo(res.todo)
  }
  const deleteTodoMutation = trpc.todo.deleteTodo.useMutation()
  const onDeleteTodo = async () => {
    const res = await deleteTodoMutation.mutateAsync(deleteTodoParam)
    console.log(res)
    setDeleteTodoInfo(res.todo)
  }


  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center gap-7 p-24 ${inter.className}`}
    >
      <h1 style={{ color: 'white' }}>Api Demo todo</h1>
      <div>
        <p style={{ color: 'white' }}>create</p>
        <input
          type='text'
          value={createTodoParam.title}
          onChange={(e) => setCreateTodoParam({ ...createTodoParam, title: e.target.value })}
          placeholder='title'
        />
        <input
          type='text'
          value={createTodoParam.content ?? ''}
          onChange={(e) => setCreateTodoParam({ ...createTodoParam, content: e.target.value })}
          placeholder='content'
        />
        <input
          type='date'
          value={createTodoParam.startTime ? createTodoParam.startTime.toString(): ''}
          onChange={(e) => setCreateTodoParam({ ...createTodoParam, startTime: new Date(e.target.value)})}
        />
        <input
          type='date'
          value={createTodoParam.endTime ? createTodoParam.endTime.toString(): ''}
          onChange={(e) => setCreateTodoParam({ ...createTodoParam, endTime: new Date(e.target.value)})}
        />
        <input
          type='text'
          value={createTodoParam.lavel ?? ''}
          onChange={(e) => setCreateTodoParam({ ...createTodoParam, lavel: e.target.value })}
          placeholder='lavel'
        />
        <input
          type='number'
          value={createTodoParam.userId}
          onChange={(e) => setCreateTodoParam({ ...createTodoParam, userId: parseInt(e.target.value) })}
          placeholder='userId'
        />
        <button style={{ color: 'white', marginLeft: '10px' }} onClick={() => onCreateTodo()}>
          createTodo
        </button>
        <p style={{ color: 'white' }}>response: {createTodoInfo?.title}</p>
      </div>
      <div>
        <p style={{ color: 'white' }}>update</p>
        <input
          type='number'
          value={updateTodoParam.id}
          onChange={(e) => setUpdateTodoParam({ ...updateTodoParam, id: parseInt(e.target.value) })}
          placeholder='id'
        />
        <input
          type='text'
          value={updateTodoParam.title}
          onChange={(e) => setUpdateTodoParam({ ...updateTodoParam, title: e.target.value })}
          placeholder='title'
        />
        <input
          type='text'
          value={updateTodoParam.content ?? ''}
          onChange={(e) => setUpdateTodoParam({ ...updateTodoParam, content: e.target.value })}
          placeholder='content'
        />
        <input
          type='date'
          value={updateTodoParam.startTime ? updateTodoParam.startTime.toString() : ''}
          onChange={(e) => setUpdateTodoParam({ ...updateTodoParam, startTime: new Date(e.target.value)})}
        />
        <input
          type='date'
          value={updateTodoParam.endTime ? updateTodoParam.endTime.toString() : ''}
          onChange={(e) => setUpdateTodoParam({ ...updateTodoParam, endTime: new Date(e.target.value) })}
        />
        <input
          type='text'
          value={updateTodoParam.lavel ?? ''}
          onChange={(e) => setUpdateTodoParam({ ...updateTodoParam, lavel: e.target.value })}
          placeholder='lavel'
        />
        {/* <input
          type='number'
          value={updateTodoParam.status}
          onChange={(e) => setUpdateTodoParam({ ...updateTodoParam, status: e.target.value })}
          placeholder='status'
        /> */}
        <button style={{ color: 'white', marginLeft: '10px' }} onClick={() => onUpdateTodo()}>
          updateTodo
        </button>
        <p style={{ color: 'white' }}>response: {updateTodoInfo?.title}</p>
      </div>
      <div>
      <p style={{ color: 'white' }}>delete</p>
        <input
          type='number'
          value={deleteTodoParam.id}
          onChange={(e) => setDeleteTodoParam({ ...deleteTodoParam, id: parseInt(e.target.value) })}
          placeholder='id'
        />
        <button style={{ color: 'white', marginLeft: '10px' }} onClick={() => onDeleteTodo()}>
          deleteTodo
        </button>
        <p style={{ color: 'white' }}>response: {deleteTodoInfo?.title}</p>
      </div>
    </main>
  )
}