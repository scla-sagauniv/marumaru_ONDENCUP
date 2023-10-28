import { Inter } from 'next/font/google'
import { useState } from 'react'

import { CreatePasswordResetUrlReqType } from '@/services/schema/auth/passwordReset'
import { SignInReqType } from '@/services/schema/auth/signIn'
import { SignUpReqType } from '@/services/schema/auth/signUp'
import { UserOnAppType } from '@/services/schema/user'
import { trpc } from '@/utils/trpc'

const inter = Inter({ subsets: ['latin'] })

const Healthcheck = ({ input }: { input: { name: string | undefined } }) => {
  const res = trpc.healthcheck.useQuery(input)
  if (!res.data) {
    return <p style={{ color: 'white' }}>Loading...</p>
  }
  if (res.error) {
    return <p style={{ color: 'white' }}>{res.error.message}</p>
  }
  console.log(res.data)
  return <p style={{ color: 'white' }}>response: {res.data.greeting}</p>
}

const FetchUser = () => {
  const res = trpc.auth.fetchUser.useQuery()
  if (!res.data) {
    return <p style={{ color: 'white' }}>Loading...</p>
  }
  if (res.error) {
    return <p style={{ color: 'white' }}>{res.error.message}</p>
  }
  console.log(res.data)
  return <p style={{ color: 'white' }}>response: {res.data.user?.name}</p>
}

export default function ApiDemoPage() {
  const [healthValue, setHealthValue] = useState<{ name: string | undefined }>({
    name: undefined,
  })
  const [name, setName] = useState<string>('')

  const [userInfo, setUserInfo] = useState<UserOnAppType | undefined>(undefined)
  const [signUpParam, setSignUpParam] = useState<SignUpReqType>({
    email: '',
    name: '',
    password: '',
  })
  const signUpMutation = trpc.auth.signUp.useMutation()
  const onSignUp = async () => {
    const res = await signUpMutation.mutateAsync(signUpParam)
    console.log(res)
    setUserInfo(res.user)
  }

  const [signInParam, setSignInParam] = useState<SignInReqType>({
    email: '',
    password: '',
  })
  const signInMutation = trpc.auth.signIn.useMutation()
  const onSignIn = async () => {
    const res = await signInMutation.mutateAsync(signInParam)
    console.log(res)
    setUserInfo(res.user)
  }

  const signOutMutation = trpc.auth.signOut.useMutation()
  const onSignOut = async () => {
    const res = await signOutMutation.mutateAsync()
    console.log(res)
    setUserInfo(undefined)
  }

  const [createPasswordResetUrlParam, setCreatePasswordResetUrlParam] =
    useState<CreatePasswordResetUrlReqType>({ email: '' })
  const createPasswordResetUrlMutation = trpc.auth.createPasswordResetUrl.useMutation()
  const onCreatePasswordResetUrl = async () => {
    const res = await createPasswordResetUrlMutation.mutateAsync({
      email: createPasswordResetUrlParam.email,
    })
    console.log(res)
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center gap-7 p-24 ${inter.className}`}
    >
      <h1 style={{ color: 'white' }}>Api Demo</h1>
      <div>
        <p style={{ color: 'white' }}>healthcheck</p>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        <button
          style={{ color: 'white', marginLeft: '10px' }}
          onClick={() => setHealthValue({ name: name })}
        >
          Submit
        </button>
        <Healthcheck input={healthValue} />
      </div>
      <div>
        <p style={{ color: 'white' }}>signUp</p>
        <input
          type='text'
          value={signUpParam.email}
          onChange={(e) => setSignUpParam({ ...signUpParam, email: e.target.value })}
          placeholder='email'
        />
        <input
          type='name'
          value={signUpParam.name}
          onChange={(e) => setSignUpParam({ ...signUpParam, name: e.target.value })}
          placeholder='name'
        />
        <input
          type='password'
          value={signUpParam.password}
          onChange={(e) => setSignUpParam({ ...signUpParam, password: e.target.value })}
          placeholder='password'
        />
        <button style={{ color: 'white', marginLeft: '10px' }} onClick={() => onSignUp()}>
          SignUp
        </button>
        <p style={{ color: 'white' }}>response: {userInfo?.name}</p>
      </div>
      <div>
        <p style={{ color: 'white' }}>signIn</p>
        <input
          type='text'
          value={signInParam.email}
          onChange={(e) => setSignInParam({ ...signInParam, email: e.target.value })}
          placeholder='email'
        />
        <input
          type='password'
          value={signInParam.password}
          onChange={(e) => setSignInParam({ ...signInParam, password: e.target.value })}
          placeholder='password'
        />
        <button style={{ color: 'white', marginLeft: '10px' }} onClick={() => onSignIn()}>
          SignIn
        </button>
        <p style={{ color: 'white' }}>response: {userInfo?.name}</p>
      </div>
      <div>
        <p style={{ color: 'white' }}>fetchUser</p>
        <FetchUser />
      </div>
      <div>
        <button style={{ color: 'white' }} onClick={onSignOut}>
          SignOut
        </button>
      </div>
      <div>
        <p style={{ color: 'white' }}>CreatePasswordResetUrl</p>
        <input
          type='text'
          value={createPasswordResetUrlParam.email}
          onChange={(e) => setCreatePasswordResetUrlParam({ email: e.target.value })}
          placeholder='email'
        />
        <button style={{ color: 'white' }} onClick={onCreatePasswordResetUrl}>
          Create Password Reset Url
        </button>
      </div>
    </main>
  )
}
