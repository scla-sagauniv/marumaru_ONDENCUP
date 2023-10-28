import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { addDays } from 'date-fns'
import { ReactNode, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Form, useForm } from 'react-hook-form'
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
import { FormField } from '@/_components/ui/form'
import { Input } from '@/_components/ui/input'
import { Separator } from '@/_components/ui/separator'

import { CalendarForm } from '../CalendarForm'

export function TodoModal({ children }: { children: ReactNode }) {
  const onSubmit = (data: any) => console.log(data)
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  const formSchema = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
  })
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[800px] px-7'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
            </DialogHeader>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <div className='flex py-4 h-[200px] w-full'>
                  <div className='flex flex-col justify-start items-center gap-4 w-1/2'>
                    <Label htmlFor='name' className='text-left w-full'>
                      Title
                    </Label>
                    <Input
                      id='name'
                      defaultValue='Pedro Duarte'
                      className='col-span-3'
                      {...field}
                    />
                    <Label htmlFor='username' className='text-left w-full'>
                      Detail
                    </Label>
                    <Input
                      id='username'
                      defaultValue='@peduarte'
                      className='col-span-3'
                      {...field}
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
              )}
            />
            <DialogFooter>
              <Button type='submit'>Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
