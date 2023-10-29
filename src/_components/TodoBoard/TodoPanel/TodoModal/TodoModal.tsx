import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { ReactNode, useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/_components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/_components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/_components/ui/form'
import { Input } from '@/_components/ui/input'
import { Separator } from '@/_components/ui/separator'
import { TodoOnAppType } from '@/services/schema/todo'
import { CreateTodoReq } from '@/services/schema/todo/create'
import { trpc } from '@/utils/trpc'

import { CalendarForm } from '../CalendarForm'

type TodoModalProps = {
  children: ReactNode
  todo?: TodoOnAppType
}

export function TodoModal({ children, todo }: TodoModalProps) {
  const [date, setDate] = useState<DateRange | undefined>(undefined)

  useEffect(() => {
    if (!todo) return
    setDate({
      from: todo.startTime ?? undefined,
      to: todo.endTime ?? undefined,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formSchema = z.object({
    title: CreateTodoReq.shape.title,
    content: CreateTodoReq.shape.content,
    label: CreateTodoReq.shape.label,
  })
  type formSchemaType = z.infer<typeof formSchema>

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  })

  const todoMutation = trpc.todo.createTodo.useMutation()
  async function onSubmit(values: formSchemaType) {
    console.log(values)

    const res = await todoMutation.mutateAsync({
      ...values,
      startTime: date?.from ?? null,
      endTime: date?.to ?? null,
    })
    console.log(res)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[800px] px-7'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex py-4 h-[200px] w-full'>
              <div className='flex flex-col justify-start items-center gap-4 w-1/2'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='title' className='text-left w-full'>
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          id='title'
                          defaultValue={todo?.title ?? ''}
                          className='col-span-3'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='content'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='content' className='text-left w-full'>
                        Content
                      </FormLabel>
                      <FormControl>
                        <Input
                          id='content'
                          defaultValue={todo?.content ?? ''}
                          className='col-span-3'
                          {...field}
                          value={field.value ?? ''}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='label'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Label htmlFor='label' className='text-left w-full'>
                          Label
                        </Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          id='label'
                          defaultValue={todo?.label ?? ''}
                          className='col-span-3'
                          {...field}
                          value={field.value ?? ''}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Separator orientation='vertical' className='mx-6' />
              <div className='flex flex-col justify-start items-center gap-4 w-1/2'>
                <Label htmlFor='email' className='text-left w-full'>
                  Deadline
                </Label>
                <div className='flex w-full'>
                  <CalendarForm date={date} setDate={setDate} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type='submit'>Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
