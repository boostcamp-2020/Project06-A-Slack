/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';
import { RootState } from '@/store/modules';

interface AuthState {
  user: User | null;
  isLogin: boolean;
  isLoggingIn: boolean;
}

const authState: AuthState = {
  user: null,
  isLogin: false,
  isLoggingIn: false,
};

export interface UserLoginPayload {
  email: string;
  pw: string;
}
export interface AuthTokenPayload {
  accessToken: string;
  refreshToken: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    loginRequest(state, action: PayloadAction<UserLoginPayload>) {
      state.isLoggingIn = true;
    },
    loginSuccess(state) {
      state.isLoggingIn = false;
      state.isLogin = true;
    },
    loginFailure(state) {
      state.isLoggingIn = false;
      state.isLogin = false;
    },
    loginCancelled() {},
    logoutRequest() {},
    logoutSuccess(state) {
      state.isLogin = false;
    },
    logoutFailure() {},
  },
});

const selectAuthState = (state: RootState) => state.auth;

export const selectAuth = createSelector([selectAuthState], (auth) => auth);
export const AUTH = authSlice.name;
export const AUTH_ACTIONS = authSlice.actions;

export default authSlice.reducer;
