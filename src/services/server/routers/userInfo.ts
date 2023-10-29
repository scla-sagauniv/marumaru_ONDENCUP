import { hash, genSalt, compare } from 'bcrypt'

import {
  UpdateUserInfoReq,
  UpdateUserInfoResType,
} from '@/services/schema/userInfo/update'
import {
  UpdateUserPassReq,
  UpdateUserPassResType,
} from '@/services/schema/userInfo/updatePass'
import { procedure, router } from '@/services/server/trpc'

import * as userLogic from '../logic/user'

export const userRouter = router({
  updateUserInfo: procedure
    .input(UpdateUserInfoReq)
    .mutation(async ({ ctx, input }): Promise<UpdateUserInfoResType> => {
      const userInfo = ctx.session.user
      if (!userInfo) {
        throw new Error('User not found')
      }
      const user = await userLogic.updateUser(userInfo.id, input, ctx.prisma)
      const userOnApp = userLogic.toUserOnApp(user)
      return { user: userOnApp }
    }),
  updateUserPass: procedure
    .input(UpdateUserPassReq)
    .mutation(async ({ ctx, input }): Promise<UpdateUserPassResType> => {
      const userInfo = ctx.session.user
      if (!userInfo) {
        throw new Error('User not found')
      }
      const user = await userLogic.findUserById(userInfo.id, ctx.prisma)
      const verifyPass = await compare(input.password, user!.password)
      if (verifyPass) {
        if (input.newPassword === input.confirmNewPassword) {
          const salt = await genSalt(10)
          const hashedPassword = await hash(input.newPassword, salt)
          input.newPassword = hashedPassword
          const updatedUser = await userLogic.updatePass(
            userInfo.id,
            input.newPassword,
            ctx.prisma,
          )
          const userOnApp = userLogic.toUserOnApp(updatedUser)
          return { user: userOnApp }
        } else {
          throw new Error('Password does not match')
        }
      } else {
        throw new Error('Password is incorrect')
      }
    }),
})
