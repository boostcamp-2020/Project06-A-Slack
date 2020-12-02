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

export interface EditUserPayload {
  userId: number;
  displayName: string;
  phoneNumber: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    getUserRequest(state, action: PayloadAction<{ userId: number }>) {},
    getUserSuccess(state, { payload }: PayloadAction<{ userInfo: User }>) {
      state.userInfo = payload.userInfo;
    },
    getUserFailure() {},
    editUserRequest(state, action: PayloadAction<EditUserPayload>) {},
    editUserSuccess(state, action: PayloadAction<EditUserPayload>) {
      const { displayName, phoneNumber } = action.payload;
      if (state.userInfo) {
        state.userInfo.displayName = displayName;
        state.userInfo.phoneNumber = phoneNumber;
      }
    },
    editUserFailure() {},
  },
});

export const USER = userSlice.name;
export const {
  getUserRequest,
  getUserSuccess,
  getUserFailure,
  editUserRequest,
  editUserSuccess,
  editUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
