import { z } from 'zod'

import { TodoOnApp } from '../todo'

export const GetTodoReq = z.object({
  id: z.number(),
})

export type GetTodoReqType = z.infer<typeof GetTodoReq>

export const GetTodoRes = z.object({
  todo: z.array(TodoOnApp),
})

export type GetTodoResType = z.infer<typeof GetTodoRes>
