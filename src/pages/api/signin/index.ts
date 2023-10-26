import { errorHandler } from '@/lib/error'
import { ApiHandler } from '@/lib/nextUtils/api'
import { getSession } from '@/lib/session'
import { SigninUserType } from '@/services/server/Signin'

export type ApiReturnType = SigninUserType

export const handleLogin: ApiHandler<ApiReturnType> = async (req, res) => {
  try {
    // const username = req.body.username
    // const password = req.body.password

    const userInfo = { email: 'return@email.com', username: 'returnUsername' }

    const session = await getSession(req, res)
    session.user = userInfo // 本当はserverからの返り値を入れたほうがよき

    res.status(200).json(userInfo) // 本当はserverからの返り値を入れル！
  } catch (error) {
    errorHandler({ error, res })
  }
}
