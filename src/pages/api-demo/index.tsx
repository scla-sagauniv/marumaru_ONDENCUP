import { Inter } from 'next/font/google'
import { useState } from 'react'

import { CreatePasswordResetUrlReqType } from '@/services/schema/auth/passwordReset'
import { SignInReqType } from '@/services/schema/auth/signIn'
import { SignUpReqType } from '@/services/schema/auth/signUp'
import { UserOnAppType } from '@/services/schema/user'
import { UpdateUserInfoReqType } from '@/services/schema/userInfo/update'
import { UpdateUserPassReqType } from '@/services/schema/userInfo/updatePass'
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
  const [updateUserInfoParam, setUpdateUserInfoParam] = useState<UpdateUserInfoReqType>({
    name: '',
    avatarUrl: '',
  })
  const updateUserInfoMutation = trpc.user.updateUserInfo.useMutation()
  const onUpdateUserInfo = async () => {
    const res = await updateUserInfoMutation.mutateAsync(updateUserInfoParam)
    console.log(res)
    setUserInfo(res.user)
  }

  const [updateUserPassParam, setUpdateUserPassParam] = useState<UpdateUserPassReqType>({
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const updateUserPassMutation = trpc.user.updateUserPass.useMutation()
  const onUpdateUserPass = async () => {
    const res = await updateUserPassMutation.mutateAsync(updateUserPassParam)
    console.log(res)
    setUserInfo(res.user)
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
          type='text'
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
        <p style={{ color: 'white' }}>updateInfo</p>
        <input
          type='text'
          value={updateUserInfoParam.name}
          onChange={(e) =>
            setUpdateUserInfoParam({ ...updateUserInfoParam, name: e.target.value })
          }
          placeholder='name'
        />
        <input
          type='text'
          value={updateUserInfoParam.avatarUrl}
          onChange={(e) =>
            setUpdateUserInfoParam({
              ...updateUserInfoParam,
              avatarUrl: e.target.value,
            })
          }
          placeholder='avatarUrl'
        />
        <button
          style={{ color: 'white', marginLeft: '10px' }}
          onClick={() => onUpdateUserInfo()}
        >
          update
        </button>
        <p style={{ color: 'white' }}>response: {userInfo?.name}</p>
      </div>
      <div>
        <p style={{ color: 'white' }}>updatePass</p>
        <input
          type='password'
          value={updateUserPassParam.password}
          onChange={(e) =>
            setUpdateUserPassParam({ ...updateUserPassParam, password: e.target.value })
          }
          placeholder='old pass'
        />
        <input
          type='password'
          value={updateUserPassParam.newPassword}
          onChange={(e) =>
            setUpdateUserPassParam({
              ...updateUserPassParam,
              newPassword: e.target.value,
            })
          }
          placeholder='new pass'
        />
        <input
          type='password'
          value={updateUserPassParam.confirmNewPassword}
          onChange={(e) =>
            setUpdateUserPassParam({
              ...updateUserPassParam,
              confirmNewPassword: e.target.value,
            })
          }
          placeholder='new pass(Re)'
        />
        <button
          style={{ color: 'white', marginLeft: '10px' }}
          onClick={() => onUpdateUserPass()}
        >
          password reset
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
