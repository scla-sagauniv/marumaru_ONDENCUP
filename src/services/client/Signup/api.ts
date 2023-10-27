import { SignUpReqType, SignUpResType } from '@/services/schema/auth/signUp'

import { clientResponseHandler } from '..'

export const handleSignup = async (input: SignUpReqType): Promise<SignUpResType> => {
  const res = await fetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify(input),
  })
  return clientResponseHandler(res)
}
