import { Status } from '@prisma/client'
import { z } from 'zod'

  
export const TodoOnApp = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string().nullable(),
    startTime: z.date().nullable(),
    endTime: z.date().nullable(),
    lavel: z.string().nullable(),
    status: z.nativeEnum(Status),
    userId: z.number(),
})

export type TodoOnAppType = z.infer<typeof TodoOnApp>

