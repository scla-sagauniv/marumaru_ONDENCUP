import { PrismaClient, User } from '@/../node_modules/.prisma/client'

import { SignUpReqType } from '@/services/schema/auth/signUp'
import { UserOnAppType } from '@/services/schema/user'

export const createUser = async (params: SignUpReqType, prisma: PrismaClient) => {
  const { name, email, password } = params
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })
  return user
}

export const findUserByEmail = async (
  email: UserOnAppType['email'],
  prisma: PrismaClient,
) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })
  return user
}

export const toUserOnApp = (user: User): UserOnAppType => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
  }
}
