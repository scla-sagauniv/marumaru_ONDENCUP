import { PrismaClient, Todo, User } from '@prisma/client'

import { TodoOnAppType } from '@/services/schema/todo'
import { CreateTodoReqType } from '@/services/schema/todo/create'
import { UpdateTodoReqType } from '@/services/schema/todo/update'

// create
export const createTodo = async (
  params: CreateTodoReqType,
  userId: User['id'],
  prisma: PrismaClient,
) => {
  const { title, content, startTime, endTime, lavel } = params
  const todo = await prisma.todo.create({
    data: {
      title,
      content,
      startTime,
      endTime,
      lavel,
      userId,
    },
  })
  return todo
}

// read
export const getAllTodo = async (id: TodoOnAppType['userId'], prisma: PrismaClient) => {
  const todo = await prisma.todo.findMany({
    where: {
      userId: id,
    },
  })
  return todo
}
// update

export const updateTodo = async (
  id: TodoOnAppType['id'],
  params: UpdateTodoReqType,
  prisma: PrismaClient,
) => {
  const { title, content, startTime, endTime, lavel, status } = params
  const todo = await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      title,
      content,
      startTime,
      endTime,
      lavel,
      status,
    },
  })
  return todo
}
// delete

export const deleteTodo = async (id: TodoOnAppType['id'], prisma: PrismaClient) => {
  const todo = prisma.todo.delete({
    where: {
      id: id,
    },
  })
  return todo
}

// 締め切りがギリなtodoのrecordを取得、titleとemailを取得
export const getDeadlineTodo = async (prisma: PrismaClient) => {
  const today = new Date(Date.now())
  const todo = await prisma.todo.findMany({
    where: {
      endTime: {
        gte: today,
        lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    },
    select: {
      title: true,
      user: {
        select: {
          email: true,
        },
      },
    },
  })
  return todo || undefined
}

export const toTodoOnApp = (todo: Todo): TodoOnAppType => {
  return {
    id: todo.id,
    title: todo.title,
    content: todo.content,
    startTime: todo.startTime,
    endTime: todo.endTime,
    lavel: todo.lavel,
    status: todo.status,
    userId: todo.userId,
  }
}
