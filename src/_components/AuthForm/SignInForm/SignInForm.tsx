import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/_components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/_components/ui/form'
import { Input } from '@/_components/ui/input'
import { SignInReq, SignInReqType } from '@/services/schema/auth/signIn'
import { trpc } from '@/utils/trpc'

export default function SignInForm() {
  const authMutation = trpc.auth.signIn.useMutation()
  const defaultValues: SignInReqType = {
    email: '',
    password: '',
  }

  const signInForm = useForm<SignInReqType>({
    resolver: zodResolver(SignInReq),
    defaultValues: defaultValues,
  })

  async function onSubmit(values: SignInReqType) {
    // const res = await handleSignin(values)
    const res = await authMutation.mutateAsync(values)
    console.log(res)
  }

  return (
    <Form {...signInForm}>
      <form onSubmit={signInForm.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={signInForm.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signInForm.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Sign In</Button>
      </form>
    </Form>
  )
}
