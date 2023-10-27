import { CreateTodoReq, GetTodoReq, UpdateTodoReq, DeleteTodoReq, CreateTodoResType, GetTodoResType, UpdateTodoResType, DeleteTodoResType  } from '@/services/schema/crud'
import { procedure, router } from '@/services/server/trpc'

import * as todoLogic from '../logic/todo'

export const todoRouter = router({
  createTodo: procedure
    .input(CreateTodoReq)
    .mutation(async ({ ctx, input }): Promise<CreateTodoResType> => {
      const todo = await todoLogic.createTodo(input, ctx.prisma)
      console.log(todo.startTime)
      return { todo: { id: todo.id, title: todo.title, content: todo.content, startTime: todo.startTime, endTime: todo.endTime, lavel: todo.lavel, status: todo.status, userId: todo.userId } }
    }),
  getTodo: procedure
    .input(GetTodoReq)
    .query(async ({ ctx, input }): Promise<GetTodoResType> => {
      const todos = await todoLogic.getAllTodo(input.id, ctx.prisma)
      console.log(todos)
      const todoList = todos.map(todo => ({
        id: todo.id,
        title: todo.title,
        content: todo.content,
        startTime: todo.startTime,
        endTime: todo.endTime,
        lavel: todo.lavel,
        status: todo.status,
        userId: todo.userId
      }));
      return { todo: todoList };
    }),
  updateTodo: procedure
    .input(UpdateTodoReq)
    .mutation(async ({ ctx, input }): Promise<UpdateTodoResType> => {
      const todo = await todoLogic.updateTodo(input.id, input, ctx.prisma)
      return { todo: { id: todo.id, title: todo.title, content: todo.content, startTime: todo.startTime, endTime: todo.endTime, lavel: todo.lavel, status: todo.status, userId: todo.userId } }
    }),
  deleteTodo: procedure
    .input(DeleteTodoReq)
    .mutation(async ({ ctx, input }): Promise<DeleteTodoResType> => {
      const todo = await todoLogic.deleteTodo(input.id, ctx.prisma)
      return { todo: { id: todo.id, title: todo.title, content: todo.content, startTime: todo.startTime, endTime: todo.endTime, lavel: todo.lavel, status: todo.status, userId: todo.userId } }
    }),
})
