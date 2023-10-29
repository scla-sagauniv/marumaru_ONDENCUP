import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserOnAppType } from '@/services/schema/user'

import type { RootState } from '../store'

type UserOnAppObj = { user: UserOnAppType; isFirstFetched: boolean }

const initialState: UserOnAppObj = {
  user: {
    id: 0,
    name: 'dummy',
    email: 'dummy',
    avatarUrl: 'dummy',
  },
  isFirstFetched: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    addUser: (state, action: PayloadAction<{ user: UserOnAppType }>) => {
      state.user = action.payload.user
    },
    updateUser: (
      state,
      action: PayloadAction<Partial<{ name: string; avatarUrl: string }>>,
    ) => {
      state.user = { ...state.user, ...action.payload }
    },
    updateIsFirstFetched: (state, action: PayloadAction<boolean>) => {
      state.isFirstFetched = action.payload
    },
    deleteUser: (state) => {
      state.user = initialState.user
    },
  },
})

export const userActions = userSlice.actions
export const {
  addUser: addUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  updateIsFirstFetched: updateIsFirstFetched,
} = userSlice.actions

export const selectUser = (state: RootState) => state.app.user
export const selectFirstFetched = (state: RootState) => state.app.isFirstFetched

export default userSlice.reducer
