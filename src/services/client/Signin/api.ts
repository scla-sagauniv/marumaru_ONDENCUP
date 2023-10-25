// apiを叩くためのapi

import { SigninInputType } from '@/services/server/Signin'

// input: signin information
export const handleLogin = async (input: SigninInputType) => {
  const res = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(input),
  })
  if (!res.ok) {
    throw new Error('error')
  }
  return res.json()
}
