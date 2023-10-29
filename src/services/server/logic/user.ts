import { PrismaClient, User } from '@prisma/client'

import { SignUpReqType } from '@/services/schema/auth/signUp'
import { UserOnAppType } from '@/services/schema/user'
import { UpdateUserInfoReqType } from '@/services/schema/userInfo/update'
import { UpdateUserPassReqType } from '@/services/schema/userInfo/updatePass'

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

export const updateUser = async (
  id: UserOnAppType['id'],
  params: UpdateUserInfoReqType,
  prisma: PrismaClient,
) => {
  const { name, avatarUrl } = params
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name,
      avatarUrl,
    },
  })
  return user
}

export const updatePass = async (
  id: UserOnAppType['id'],
  newPassword: UpdateUserPassReqType['newPassword'],
  prisma: PrismaClient,
) => {
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      password: newPassword,
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

export const findUserById = async (id: UserOnAppType['id'], prisma: PrismaClient) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
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
