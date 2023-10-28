import { hash, genSalt, compare } from 'bcrypt'
import { nanoid } from 'nanoid'

import {
  CreatePasswordResetUrlReq,
  CreatePasswordResetUrlResType,
  ResetPasswordReq,
  ResetPasswordResType,
} from '@/services/schema/auth/passwordReset'
import { SignInReq } from '@/services/schema/auth/signIn'
import { SignUpReq, SignUpResType } from '@/services/schema/auth/signUp'
import { procedure, router } from '@/services/server/trpc'

import sendEmail from '../lib/email/send'
import * as userLogic from '../logic/user'

export const authRouter = router({
  signUp: procedure
    .input(SignUpReq)
    .mutation(async ({ ctx, input }): Promise<SignUpResType> => {
      const salt = await genSalt(10)
      const hashedPassword = await hash(input.password, salt)
      input.password = hashedPassword
      const user = await userLogic.createUser(input, ctx.prisma)
      const userOnApp = userLogic.toUserOnApp(user)
      ctx.session.user = userOnApp
      return { user: userOnApp }
    }),
  signIn: procedure
    .input(SignInReq)
    .mutation(async ({ ctx, input }): Promise<SignUpResType> => {
      const user = await userLogic.findUserByEmail(input.email, ctx.prisma)
      if (!user) {
        throw new Error('User not found')
      }
      const verifyPass = await compare(input.password, user.password)
      console.log(verifyPass)
      if (!verifyPass) {
        throw new Error('Password is incorrect')
      }
      ctx.session.user = userLogic.toUserOnApp(user)
      const userOnApp = userLogic.toUserOnApp(user)
      return { user: userOnApp }
    }),
  fetchUser: procedure.query(({ ctx }) => {
    return { user: ctx.session.user }
  }),
  signOut: procedure.mutation(({ ctx }) => {
    ctx.session.user = undefined
    return { user: undefined }
  }),
  createPasswordResetUrl: procedure
    .input(CreatePasswordResetUrlReq)
    .mutation(async ({ ctx, input }): Promise<CreatePasswordResetUrlResType> => {
      const user = await userLogic.findUserByEmail(input.email, ctx.prisma)
      if (!user) {
        throw new Error('User not found')
      }
      const token = nanoid()
      ctx.redisClient.set(token, user.id)
      ctx.redisClient.expire(token, 60 * 10) // 10 minutes
      const resetUrl = `${process.env.BASE_URL}/api-demo/reset-password?token=${token}`
      const body = `<div>Click <a href="${resetUrl}">here</a> to reset your password</div>`
      sendEmail({ tos: [user.email], subject: 'Reset Password', body: body })
      return { isSuccessful: true, message: 'OK' }
    }),
  resetPassword: procedure
    .input(ResetPasswordReq)
    .mutation(async ({ ctx, input }): Promise<ResetPasswordResType> => {
      const userId = await ctx.redisClient.get(input.token)
      if (!userId) {
        throw new Error('Token is invalid or expired')
      }
      const user = await userLogic.findUserById(Number(userId), ctx.prisma)
      if (!user) {
        throw new Error('User not found')
      }
      const salt = await genSalt(10)
      const hashedPassword = await hash(input.password, salt)
      await ctx.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
        },
      })
      ctx.redisClient.del(input.token)
      return { isSuccessful: true, message: 'OK' }
    }),
})
