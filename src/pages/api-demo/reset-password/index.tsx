import { useRouter } from 'next/router'
import { useState } from 'react'

import { trpc } from '@/utils/trpc'

const ResetPasswordPage = () => {
  // get the token from the url
  const { token } = useRouter().query

  const [password, setPassword] = useState('')

  const resetPasswordMutation = trpc.auth.resetPassword.useMutation()
  const onSubmit = async () => {
    const res = await resetPasswordMutation.mutateAsync({
      token: token as string,
      password,
    })
    console.log(res)
  }
  return (
    <div>
      <h1 style={{ color: 'white' }}>Reset Password</h1>
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={{ color: 'white', marginLeft: '10px' }} onClick={onSubmit}>
        Reset Password
      </button>
    </div>
  )
}

export default ResetPasswordPage
