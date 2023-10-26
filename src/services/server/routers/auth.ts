import { SignInReq } from '@/services/schema/auth/signIn'
import { SignUpReq, SignUpResType } from '@/services/schema/auth/signUp'
import { procedure, router } from '@/services/server/trpc'

import * as userLogic from '../logic/user'

export const authRouter = router({
  signUp: procedure
    .input(SignUpReq)
    .mutation(async ({ ctx, input }): Promise<SignUpResType> => {
      const user = await userLogic.createUser(input, ctx.prisma)
      return { user: { id: user.id, name: user.name, email: user.email } }
    }),
  signIn: procedure
    .input(SignInReq)
    .mutation(async ({ ctx, input }): Promise<SignUpResType> => {
      const user = await userLogic.findUserByEmail(input.email, ctx.prisma)
      if (!user) {
        throw new Error('User not found')
      }
      if (user.password !== input.password) {
        throw new Error('Password is incorrect')
      }
      return { user: { id: user.id, name: user.name, email: user.email } }
    }),
})
