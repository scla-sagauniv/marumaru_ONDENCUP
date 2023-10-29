import { PrismaClient, Todo, User } from '@prisma/client'

import { DeadlineTodoInfoType } from '@/services/schema/reminder/reminder'
import { TodoOnAppType } from '@/services/schema/todo'
import { CreateTodoReqType } from '@/services/schema/todo/create'
import { UpdateTodoReqType } from '@/services/schema/todo/update'

// create
export const createTodo = async (
  params: CreateTodoReqType,
  userId: User['id'],
  prisma: PrismaClient,
) => {
  const { title, content, startTime, endTime, label } = params
  const todo = await prisma.todo.create({
    data: {
      title,
      content,
      startTime,
      endTime,
      label,
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
  const { title, content, startTime, endTime, label, status } = params
  const todo = await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      title,
      content,
      startTime,
      endTime,
      label,
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
export const getDeadlineTodo = async (
  prisma: PrismaClient,
): Promise<DeadlineTodoInfoType[]> => {
  // between today and tomorrow
  const today = new Date()
  const nextDay = new Date(today)
  nextDay.setDate(today.getDate() + 1)
  const nextNextDay = new Date(today)
  nextNextDay.setDate(today.getDate() + 2)
  // console.log('between', today, tomorrow)
  console.log('today.getDate() + 1', today.getDate() + 1)
  console.log('between', nextDay, nextNextDay)
  const todos = await prisma.todo.findMany({
    where: {
      endTime: {
        // gte: today,
        gte: nextDay,
        // lt: tomorrow,
        lt: nextNextDay,
      },
    },
    select: {
      title: true,
      endTime: true,
      user: {
        select: {
          email: true,
        },
      },
    },
  })
  return todos
}

export const toTodoOnApp = (todo: Todo): TodoOnAppType => {
  return {
    id: todo.id,
    title: todo.title,
    content: todo.content,
    startTime: todo.startTime,
    endTime: todo.endTime,
    label: todo.label,
    status: todo.status,
    userId: todo.userId,
  }
}
