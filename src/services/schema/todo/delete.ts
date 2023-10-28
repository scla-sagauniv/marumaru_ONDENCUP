import { z } from 'zod'

import { TodoOnApp } from '../todo'

export const DeleteTodoReq = z.object({
  id: z.number(),
})

export type DeleteTodoReqType = z.infer<typeof DeleteTodoReq>

export const DeleteTodoRes = z.object({
  todo: TodoOnApp,
})

export type DeleteTodoResType = z.infer<typeof DeleteTodoRes>
