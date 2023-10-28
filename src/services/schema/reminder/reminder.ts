import * as z from 'zod'

export const DeadlineTodoInfo = z.object({
  title: z.string(),
  endTime: z.date().nullable(),
  user: z.object({
    email: z.string(),
  }),
})
export type DeadlineTodoInfoType = z.infer<typeof DeadlineTodoInfo>

export const SendEmailTodoAndUserRes = z.object({
  todos: z.array(DeadlineTodoInfo),
})
export type SendEmailTodoAndUserResType = z.infer<typeof SendEmailTodoAndUserRes>
