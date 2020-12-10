/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { User } from '@/types';
import { USER_DEFAULT_PROFILE_URL } from '@/utils/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  userInfo: User | null;
  edit: {
    loading: boolean;
    success: boolean;
    err: Error | null;
  };
  matchUsersInfo: User[] | null;
}

const userState: UserState = {
  userInfo: null,
  edit: {
    loading: false,
    success: false,
    err: null,
  },
  matchUsersInfo: [],
};

export interface EditUserPayload {
  userId: number;
  displayName: string;
  phoneNumber: string;
}

export interface EditUserRequestPayload extends EditUserPayload {
  handleClose: () => void;
  profileImage: File | undefined | string;
  previousFileName: string | undefined;
}

export interface EditUserSuccessPayload extends EditUserPayload {
  image: string;
  setDefault: boolean;
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
    editUserSuccess(state, action: PayloadAction<EditUserSuccessPayload>) {
      const { displayName, phoneNumber, image, setDefault } = action.payload;
      if (state.userInfo) {
        state.userInfo.displayName = displayName;
        state.userInfo.phoneNumber = phoneNumber;
        if (setDefault) {
          state.userInfo.image = USER_DEFAULT_PROFILE_URL;
        } else if (image) {
          state.userInfo.image = image;
        }
        state.edit.loading = false;
        state.edit.success = true;
      }
    },
    editUserFailure(state, { payload }: PayloadAction<{ err: Error }>) {
      state.edit.loading = false;
      state.edit.success = false;
      state.edit.err = payload.err;
    },
    matchUsersRequest(state, action) {},
    matchUsersSuccess(state, action) {
      state.matchUsersInfo = action.payload.matchUsersInfo;
    },
    matchUsersFailure(state, action) {},
    modifyUserLastChannelId(state, { payload }: PayloadAction<{ lastChannelId: number }>) {
      if (state.userInfo) {
        state.userInfo.lastChannelId = payload.lastChannelId;
      }
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
  matchUsersRequest,
  matchUsersSuccess,
  matchUsersFailure,
  modifyUserLastChannelId,
} = userSlice.actions;

export default userSlice.reducer;
