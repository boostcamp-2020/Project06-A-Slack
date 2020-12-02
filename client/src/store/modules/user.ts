/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { User } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  userInfo: User | null;
  edit: {
    loading: boolean;
    success: boolean;
    err: Error | null;
  };
}

const userState: UserState = {
  userInfo: null,
  edit: {
    loading: false,
    success: false,
    err: null,
  },
};

export interface EditUserPayload {
  userId: number;
  displayName: string;
  phoneNumber: string;
}

export interface EditUserRequestPayload extends EditUserPayload {
  handleClose: () => void;
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
    editUserRequest(state, action: PayloadAction<EditUserRequestPayload>) {
      state.edit.loading = true;
      state.edit.success = false;
    },
    editUserSuccess(state, action: PayloadAction<EditUserPayload>) {
      const { displayName, phoneNumber } = action.payload;
      if (state.userInfo) {
        state.userInfo.displayName = displayName;
        state.userInfo.phoneNumber = phoneNumber;
        state.edit.loading = false;
        state.edit.success = true;
      }
    },
    editUserFailure(state, { payload }: PayloadAction<{ err: Error }>) {
      state.edit.loading = false;
      state.edit.success = false;
      state.edit.err = payload.err;
    },
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
