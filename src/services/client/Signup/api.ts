import { ApiReturnType } from '@/pages/api/signin'
import { SigninInputType } from '@/services/server/Signin'

import { clientResponseHandler } from '..'

export const handleLogin = async (input: SigninInputType): Promise<ApiReturnType> => {
  const res = await fetch('/api/signin', {
    method: 'POST',
    body: JSON.stringify(input),
  })
  return clientResponseHandler(res)
}
