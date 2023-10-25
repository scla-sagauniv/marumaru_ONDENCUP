import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/_components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/_components/ui/tabs'

import { SignInForm } from './SignInForm/SignInForm'
import { SignUpForm } from './SignUpForm/SignUpForm'

export function AuthForm() {
  return (
    <Tabs defaultValue='account' className='w-[400px]'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='account'>Sign In</TabsTrigger>
        <TabsTrigger value='password'>Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value='account'>
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Welcome back! We demand your Username and Password to continue.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <SignInForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value='password'>
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Welcome! You need to tell us your Username, Email address, and Password to
              continue.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <SignUpForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
