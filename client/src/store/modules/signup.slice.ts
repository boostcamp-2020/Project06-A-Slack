/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/modules';

interface SignupState {
  email: string | null;
  verify: {
    loading: boolean;
    verifyCode: string | null;
    err: {
      message: string;
    } | null;
  };
}

const signupState: SignupState = {
  email: null,
  verify: {
    loading: false,
    verifyCode: null,
    err: null,
  },
};

export interface VerifyEmailSendRequestPayload {
  email: string;
}

interface VerifyEmailSendSuccessPayload {
  verifyCode: string;
  email: string;
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
    removeVerifyCodeAndEmail(state) {
      state.verify.verifyCode = null;
      state.email = null;
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
  removeVerifyCodeAndEmail,
} = signupSlice.actions;

export default signupSlice.reducer;
