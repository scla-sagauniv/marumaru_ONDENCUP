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
import { handleSignup } from '@/services/client/Signup'
import { SignUpSchema, SignUpSchemaType } from '@/services/client/Signup/type'

export default function SignUpForm() {
  const defaultValues: SignUpSchemaType = {
    username: '',
    email: '',
    password: '',
  }

  const signUpForm = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: defaultValues,
  })

  async function onSubmit(values: SignUpSchemaType) {
    const res = await handleSignup(values)
    console.log(res)
  }

  return (
    <Form {...signUpForm}>
      <form onSubmit={signUpForm.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={signUpForm.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='username' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signUpForm.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' placeholder='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signUpForm.control}
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
        <Button type='submit'>Ready to Go?</Button>
      </form>
    </Form>
  )
}
