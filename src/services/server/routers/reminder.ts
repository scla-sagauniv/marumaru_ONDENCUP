import { sendEmailTodoAndUserResType } from '@/services/schema/reminder/reminder'
import { procedure, router } from '@/services/server/trpc'

import sendEmail from '../lib/email/send'
import * as todoLogic from '../logic/todo'

export const remindRouter = router({
  updateUserInfo: procedure.mutation(
    async ({ ctx }): Promise<sendEmailTodoAndUserResType> => {
      const deadlineTodoInfo = await todoLogic.getDeadlineTodo(ctx.prisma)
      console.log(deadlineTodoInfo)
      const deadLineList = deadlineTodoInfo.map((todo) => ({
        title: todo.title,
        email: todo.user.email,
      }))
      deadLineList.map((todo) => {
        sendEmail({
          tos: [todo.email],
          subject: 'Deadline is approaching',
          body: todo.title,
        })
      })
      return { todo: deadLineList }
    },
  ),
})
