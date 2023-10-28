import * as z from 'zod'

export const deadlineTodoInfo = z.object({
  title: z.string(),
  email: z.string(),
})
export const sendEmailTodoAndUserRes = z.object({
  todo: z.array(deadlineTodoInfo),
})

export type sendEmailTodoAndUserResType = z.infer<typeof sendEmailTodoAndUserRes>
