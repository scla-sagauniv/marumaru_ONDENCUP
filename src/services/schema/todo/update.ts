import { Status } from '@prisma/client'
import { z } from 'zod'

import { TodoOnApp } from '../todo'

export const UpdateTodoReq = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string().nullable(),
  startTime: z.date().nullable(),
  endTime: z.date().nullable(),
  lavel: z.string().nullable(),
  status: z.nativeEnum(Status),
})

export type UpdateTodoReqType = z.infer<typeof UpdateTodoReq>

export const UpdateTodoRes = z.object({
  todo: TodoOnApp,
})

export type UpdateTodoResType = z.infer<typeof UpdateTodoRes>
