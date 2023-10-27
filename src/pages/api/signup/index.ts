import { errorHandler } from '@/lib/error'
import { ApiHandler } from '@/lib/nextUtils/api'
import { getSession } from '@/services/server/lib/session'
import { SignupUserType } from '@/services/server/Signup'

export type ApiReturnType = SignupUserType

const handleSignup: ApiHandler<ApiReturnType> = async (req, res) => {
  try {
    // const username = req.body.username
    // const email = req.body.email
    // const password = req.body.password

    const userInfo = { email: 'return@email.com', username: 'returnUsername' }

    const session = await getSession(req, res)
    session.user = userInfo // 本当はserverからの返り値を入れたほうがよき

    res.status(200).json(userInfo) // 本当はserverからの返り値を入れル！
  } catch (error) {
    errorHandler({ error, res })
  }
}

export default handleSignup
