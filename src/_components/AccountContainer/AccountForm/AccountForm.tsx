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
import {
  UpdateUserInfoReq,
  UpdateUserInfoReqType,
} from '@/services/schema/userInfo/update'
import { trpc } from '@/utils/trpc'

import { useUploadImage } from '../hooks/useUpload'

export function AccountForm({
  userId,
  name,
  avatarUrl,
}: {
  userId: string | string[] | undefined
  name: string
  avatarUrl: string
}) {
  console.log('************')
  console.log(avatarUrl)
  console.log('************')

  const router = useRouter()
  const updateUserMutation = trpc.user.updateUserInfo.useMutation()

  const form = useForm<UpdateUserInfoReqType>({
    resolver: zodResolver(UpdateUserInfoReq),
    defaultValues: {
      name: name,
    },
  })

  const { onChangeImage, imageUrl } = useUploadImage({
    register: form.register,
    setValue: form.setValue,
    name: 'avatarUrl',
    defaultImageUrl: avatarUrl,
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

  async function onSubmit(data: UpdateUserInfoReqType) {
    await updateUserMutation.mutateAsync(data)
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
            src={
              avatarUrl == 'https://http.cat/101'
                ? avatarUrl
                : `https://d1qml5tdie7qey.cloudfront.net/${imageUrl}`
            }
            alt=''
            width={100}
            height={100}
            className='w-[100px] h-[100px] rounded-full'
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
