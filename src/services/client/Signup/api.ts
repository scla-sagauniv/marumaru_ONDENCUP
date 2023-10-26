import { ApiReturnType } from '@/pages/api/signup'
import { SignupInputType } from '@/services/server/Signup'

import { clientResponseHandler } from '..'

export const handleSignup = async (input: SignupInputType): Promise<ApiReturnType> => {
  const res = await fetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify(input),
  })
  return clientResponseHandler(res)
}
