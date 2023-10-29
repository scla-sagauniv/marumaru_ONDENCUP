import { PrismaClient } from '@prisma/client'

import { SendEmailTodoAndUserResType } from '@/services/schema/reminder/reminder'
import { procedure, router } from '@/services/server/trpc'

import sendEmail from '../lib/email/send'
import * as todoLogic from '../logic/todo'

export const reminder = async (
  prisma: PrismaClient,
): Promise<SendEmailTodoAndUserResType> => {
  const deadlineTodoInfo = await todoLogic.getDeadlineTodo(prisma)
  console.log('will send', deadlineTodoInfo)
  const deadLineList = deadlineTodoInfo.map((todo) => ({
    title: todo.title,
    endTime: todo.endTime,
    user: {
      email: todo.user.email,
    },
  }))
  deadLineList.map((todo) => {
    console.log('exec reminder')
    sendEmail({
      tos: [todo.user.email],
      subject: 'Deadline is approaching',
      body: `<div>${todo.title}の締め切りが近づいています。<div>締め切りは ${
        todo.endTime && todo.endTime.toString()
      } <div>`,
    })
  })
  return { todos: deadLineList }
}

export const remindRouter = router({
  updateUserInfo: procedure.mutation(
    async ({ ctx }): Promise<SendEmailTodoAndUserResType> => {
      const todos = await reminder(ctx.prisma)
      return todos
    },
  ),
})
