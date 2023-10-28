'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/router'
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
import { trpc } from '@/utils/trpc'

import { useUploadImage } from '../hooks/useUpload'

export function AccountForm({ userId }: { userId: string | string[] | undefined }) {
  const router = useRouter()
  // account form に必要なユーザデータを取得する
  const user = trpc.auth.fetchUser.useQuery()

  const form = useForm<Omit<UserOnAppType, 'id'>>({
    resolver: zodResolver(UserOnApp.omit({ id: true })),
    defaultValues: {
      email: !user.data ? 'loading...' : user.data.user?.email,
      name: !user.data ? 'loading...' : user.data.user?.name,
      avatarUrl: !user.data ? 'loading...' : user.data.user?.avatarUrl,
    },
  })

  const { onChangeImage, imageUrl } = useUploadImage({
    register: form.register,
    setValue: form.setValue,
    name: 'avatarUrl',
    defaultImageUrl: 'https://avatars.githubusercontent.com/u/7525670?v=4',
    onRejected: (error) => {
      toast({
        title: 'Error',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>
              {JSON.stringify(form.formState.errors.avatarUrl?.message, null, 2)}
            </code>
          </pre>
        ),
      })
    },
    onResolved(data) {
      toast({
        title: 'Success',
        description: 'アバター画像を変更しました',
      })
    },
  })

  function onSubmit(data: Omit<UserOnAppType, 'id'>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  function onInvalid(errors: unknown) {
    toast({
      title: 'Error',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(errors, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className='space-y-5'>
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
          name='avatarUrl'
          render={() => (
            <FormItem>
              <FormLabel className='text-slate-100'>Avatar Image</FormLabel>
              <FormControl>
                <Input
                  type='file'
                  accept='image/png, image/jpeg'
                  onChange={onChangeImage}
                />
              </FormControl>
              <FormDescription className='text-zinc-400'>
                アバター画像を変更できます
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {imageUrl && (
          <Image
            src={imageUrl}
            alt=''
            width={100}
            height={100}
            className='rounded-full'
          />
        )}
        <Button type='submit' variant='secondary' className='mr-4'>
          Save
        </Button>
        <Button type='button' onClick={() => router.push(`/user/board/${userId}`)}>
          Back
        </Button>
      </form>
    </Form>
  )
}
