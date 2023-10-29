import { CreateTodoReq, CreateTodoResType } from '@/services/schema/todo/create'
import { DeleteTodoReq, DeleteTodoResType } from '@/services/schema/todo/delete'
import { GetTodoResType } from '@/services/schema/todo/read'
import { UpdateTodoReq, UpdateTodoResType } from '@/services/schema/todo/update'
import { procedure, router } from '@/services/server/trpc'

import * as todoLogic from '../logic/todo'

export const todoRouter = router({
  createTodo: procedure
    .input(CreateTodoReq)
    .mutation(async ({ ctx, input }): Promise<CreateTodoResType> => {
      const user = ctx.session.user
      if (!user) {
        throw new Error('User not found')
      }
      const todo = await todoLogic.createTodo(input, user.id, ctx.prisma)
      const todoOnApp = todoLogic.toTodoOnApp(todo)
      return { todo: todoOnApp }
    }),
  getTodo: procedure.query(async ({ ctx }): Promise<GetTodoResType> => {
    const user = ctx.session.user
    if (!user) {
      throw new Error('User not found')
    }
    const id = user.id
    const todos = await todoLogic.getAllTodo(id, ctx.prisma)
    const todoList = todos.map((todo) => todoLogic.toTodoOnApp(todo))
    return { todo: todoList }
  }),
  updateTodo: procedure
    .input(UpdateTodoReq)
    .mutation(async ({ ctx, input }): Promise<UpdateTodoResType> => {
      const todo = await todoLogic.updateTodo(input.id, input, ctx.prisma)
      const todoOnApp = todoLogic.toTodoOnApp(todo)
      return { todo: todoOnApp }
    }),
  deleteTodo: procedure
    .input(DeleteTodoReq)
    .mutation(async ({ ctx, input }): Promise<DeleteTodoResType> => {
      const todo = await todoLogic.deleteTodo(input.id, ctx.prisma)
      const todoOnApp = todoLogic.toTodoOnApp(todo)
      return { todo: todoOnApp }
    }),
})
