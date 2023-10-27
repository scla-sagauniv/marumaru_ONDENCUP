'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/_components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/_components/ui/form'
import { Input } from '@/_components/ui/input'
import { toast } from '@/_components/ui/use-toast'
import { UserOnApp, UserOnAppType } from '@/services/schema/user'

export function AccountForm() {
  // account form に必要なユーザデータを取得する

  const form = useForm<UserOnAppType>({
    resolver: zodResolver(UserOnApp),
    defaultValues: {
      email: 'email@mail.com',
      name: 'name',
    },
  })

  function onSubmit(data: UserOnAppType) {
    // ✅ This will be type-safe and validated because onSubmit is called only after the form is validated.
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
    console.log(data)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <p className='text-zinc-300'>
            Make changes to your account here. <br /> Click save when you&apos;ve done.
          </p>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-slate-100'>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription className='text-zinc-400'>
                  ユーザ名を変更できます
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-slate-100'>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription className='text-zinc-400'>
                  メールアドレスを変更できます
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email' // avatarUrlに変更
            render={() => (
              <FormItem>
                <FormLabel className='text-slate-100'>Avatar Image</FormLabel>
                <FormControl>
                  <Input type='file' />
                </FormControl>
                <FormDescription className='text-zinc-400'>
                  アバター画像を変更できます
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' variant='secondary' className='mr-4'>
            Save
          </Button>
          <Button type='button'>Back</Button>
        </form>
      </Form>
    </>
  )
}
