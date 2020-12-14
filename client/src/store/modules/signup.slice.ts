/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/modules';

interface SignupState {
  email: string | null;
  verify: {
    loading: boolean;
    verifyCode: string | null;
    err: Error | null;
  };
  signup: {
    loading: boolean;
    err: Error | null;
    status: number | null;
  };
  checkExistEmail: {
    loading: boolean;
    err: Error | null;
    status: number | null;
  };
}

const signupState: SignupState = {
  email: null,
  verify: {
    loading: false,
    verifyCode: null,
    err: null,
  },
  signup: {
    loading: false,
    err: null,
    status: null,
  },
  checkExistEmail: {
    loading: false,
    err: null,
    status: null,
  },
};

export interface VerifyEmailSendRequestPayload {
  email: string;
}

interface VerifyEmailSendSuccessPayload {
  verifyCode: string;
  email: string;
}

export interface signupRequestPayload {
  email: string;
  pw: string;
  displayName: string;
}

const signupSlice = createSlice({
  name: 'signup',
  initialState: signupState,
  reducers: {
    verifyEmailSendRequest(state, action: PayloadAction<VerifyEmailSendRequestPayload>) {
      state.verify.loading = true;
    },
    verifyEmailSendSuccess(state, action: PayloadAction<VerifyEmailSendSuccessPayload>) {
      const { verifyCode, email } = action.payload;
      state.verify.loading = false;
      state.verify.verifyCode = verifyCode;
      state.email = email;
    },
    verifyEmailSendFailure(state, { payload }: PayloadAction<{ err: Error }>) {
      state.verify.loading = false;
      state.verify.err = payload.err;
    },
    removeVerifyCode(state) {
      state.verify.verifyCode = null;
    },
    removeVerifyEmail(state) {
      state.email = null;
    },
    signupRequest(state, { payload }: PayloadAction<signupRequestPayload>) {
      state.signup.loading = true;
    },
    signupSuccess(state, { payload }: PayloadAction<{ status: number }>) {
      state.signup.loading = false;
      state.signup.status = payload.status;
    },
    signupFailure(state, { payload }: PayloadAction<{ err: Error }>) {
      state.signup.loading = false;
      state.signup.err = payload.err;
    },
    resetSignupState(state) {
      state.signup.loading = false;
      state.signup.err = null;
      state.signup.status = null;
    },
    checkExistEmailRequest(state, { payload }: PayloadAction<{ email: string }>) {
      state.checkExistEmail.loading = true;
    },
    checkExistEmailSuccess(state, { payload }: PayloadAction<{ status: number }>) {
      state.checkExistEmail.loading = false;
      state.checkExistEmail.status = payload.status;
      state.checkExistEmail.err = null;
    },
    checkExistEmailFailure(state, { payload }: PayloadAction<{ err: Error }>) {
      state.checkExistEmail.loading = false;
      state.checkExistEmail.status = null;
      state.checkExistEmail.err = payload.err;
    },
    resetCheckExistEmailState(state) {
      state.checkExistEmail = {
        loading: false,
        err: null,
        status: null,
      };
    },
  },
});

const selectSignupState = (state: RootState) => state.signup;

export const selectSignup = createSelector(selectSignupState, (signup) => signup);
export const SIGNUP = signupSlice.name;
export const {
  verifyEmailSendRequest,
  verifyEmailSendSuccess,
  verifyEmailSendFailure,
  removeVerifyCode,
  removeVerifyEmail,
  signupRequest,
  signupSuccess,
  signupFailure,
  resetSignupState,
  checkExistEmailRequest,
  checkExistEmailSuccess,
  checkExistEmailFailure,
  resetCheckExistEmailState,
} = signupSlice.actions;

export default signupSlice.reducer;
