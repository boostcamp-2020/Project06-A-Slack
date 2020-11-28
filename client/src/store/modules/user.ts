/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { User } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  userInfo: User | null;
}

const userState: UserState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    getUserRequest(state, action: PayloadAction<{ userId: number }>) {},
    getUserSuccess(state, { payload }: PayloadAction<{ userInfo: User }>) {
      state.userInfo = payload.userInfo;
    },
    getUserFailure() {
      window.location.href = '/login';
    },
  },
});

export const USER = userSlice.name;
export const { getUserRequest, getUserSuccess, getUserFailure } = userSlice.actions;

export default userSlice.reducer;
