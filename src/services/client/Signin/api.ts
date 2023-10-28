import { SignInReqType, SignInResType } from '@/services/schema/auth/signIn'

import { clientResponseHandler } from '..'

// input: signin information
export const handleSignin = async (input: SignInReqType): Promise<SignInResType> => {
  const res = await fetch('/api/signin', {
    method: 'POST',
    body: JSON.stringify(input),
  })
  return clientResponseHandler(res)
}
