// serverと通信するためのapi

import { NextApiRequest, NextApiResponse } from 'next'

import { getSession } from '@/lib/session'

export default async function handleLogin(req: NextApiRequest, res: NextApiResponse) {
  try {
    // const username = req.body.username
    // const password = req.body.password

    const userInfo = { email: 'return@email.com', username: 'returnUsername' }

    const session = await getSession(req, res)
    session.user = userInfo // 本当はserverからの返り値を入れたほうがよき

    res.status(200).json(userInfo) // 本当はserverからの返り値を入れル！
  } catch (error) {
    res.status(500).json('unknown error')
  }
}
