import { hash, genSalt, compare } from 'bcrypt'

import { SignInReq } from '@/services/schema/auth/signIn'
import { SignUpReq, SignUpResType } from '@/services/schema/auth/signUp'
import { procedure, router } from '@/services/server/trpc'

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
})
