/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/modules';

interface AuthState {
  loading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  userId: number | null;
}

const authState: AuthState = {
  loading: false,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  userId: localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null,
};

export interface LoginRequestPayload {
  email: string;
  pw: string;
}
export interface LoginSuccessPayload {
  accessToken: string;
  refreshToken: string;
  userId: number | null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    loginRequest(state, action: PayloadAction<LoginRequestPayload>) {
      state.loading = true;
    },
    loginSuccess(state, { payload }: PayloadAction<LoginSuccessPayload>) {
      const { accessToken, refreshToken, userId } = payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.userId = userId;

      state.loading = false;
    },
    loginFailure(state) {
      state.loading = false;
    },
    logoutRequest() {},
    logoutSuccess(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.userId = null;
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
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;

export default authSlice.reducer;
