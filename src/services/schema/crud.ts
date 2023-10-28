import { Status } from '@prisma/client'
import { z } from 'zod'


import { TodoOnApp } from './todo'

export const CreateTodoReq = z.object({
    title: z.string().min(1),
    content: z.string().nullable(),
    startTime: z.date().nullable(),
    endTime: z.date().nullable(), 
    lavel: z.string().nullable(),
    userId: z.number(),
})

export type CreateTodoReqType = z.infer<typeof CreateTodoReq>

export const CreateTodoRes = z.object({
    todo: TodoOnApp,
})

export type CreateTodoResType = z.infer<typeof CreateTodoRes>


export const GetTodoReq = z.object({
    id: z.number(),
})

export type GetTodoReqType = z.infer<typeof GetTodoReq>

export const GetTodoRes = z.object({
    todo: z.array(TodoOnApp),
})

export type GetTodoResType = z.infer<typeof GetTodoRes>


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

export const DeleteTodoReq = z.object({
    id: z.number(),
})

export type DeleteTodoReqType = z.infer<typeof DeleteTodoReq>

export const DeleteTodoRes = z.object({
    todo: TodoOnApp,
})

export type DeleteTodoResType = z.infer<typeof DeleteTodoRes>