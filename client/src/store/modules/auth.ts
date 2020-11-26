/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/modules';
import { User } from '@/types';

interface AuthState {
  loading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
}

const authState: AuthState = {
  loading: false,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  user: null,
};

export interface LoginRequestPayload {
  email: string;
  pw: string;
}
export interface LoginSuccessPayload {
  accessToken: string;
  refreshToken: string;
  user: User;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    loginRequest(state, action: PayloadAction<LoginRequestPayload>) {
      state.loading = true;
    },
    loginSuccess(state, { payload }: PayloadAction<LoginSuccessPayload>) {
      const { accessToken, refreshToken, user } = payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.user = user;

      state.loading = false;
    },
    loginFailure(state) {
      state.loading = false;
    },
    loginCancelled() {},
    logoutRequest() {},
    logoutSuccess(state) {
      state.accessToken = null;
      state.refreshToken = null;
    },
    logoutFailure() {},
  },
});

const selectAuthState = (state: RootState) => state.auth;

export const selectAuth = createSelector(selectAuthState, (auth) => auth);
export const AUTH = authSlice.name;
export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  loginCancelled,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;

export default authSlice.reducer;
