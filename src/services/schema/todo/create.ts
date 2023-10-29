import { z } from 'zod'

import { TodoOnApp } from '../todo'

export const CreateTodoReq = z.object({
  title: z.string().min(1),
  content: z.string().nullable(),
  startTime: z.date().nullable(),
  endTime: z.date().nullable(),
  label: z.string().nullable(),
})

export type CreateTodoReqType = z.infer<typeof CreateTodoReq>

export const CreateTodoRes = z.object({
  todo: TodoOnApp,
})

export type CreateTodoResType = z.infer<typeof CreateTodoRes>
