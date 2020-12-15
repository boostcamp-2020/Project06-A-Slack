import { put, all, call, fork, delay, takeLatest, throttle, debounce } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  verifyEmailSendRequest,
  verifyEmailSendSuccess,
  verifyEmailSendFailure,
  removeVerifyCode,
  VerifyEmailSendRequestPayload,
  signupRequestPayload,
  signupRequest,
  signupSuccess,
  signupFailure,
  checkExistEmailRequest,
  checkExistEmailSuccess,
  checkExistEmailFailure,
} from '@/store/modules/signup.slice';
import { authService } from '@/services';
import { TIME_MILLIS } from '@/utils/constants';

function* verifyEmailSendFlow({
  payload: { email },
}: PayloadAction<VerifyEmailSendRequestPayload>) {
  try {
    const {
      data: { verifyCode },
      status,
    } = yield call(authService.verifyEmail, { email });
    if (status === 200) {
      yield put(verifyEmailSendSuccess({ verifyCode, email }));
      yield delay(TIME_MILLIS.FIVE_MINUTE);
      yield put(removeVerifyCode());
    }
  } catch (err) {
    verifyEmailSendFailure({ err });
  }
}

function* watchVerifyFlow() {
  yield takeLatest(verifyEmailSendRequest, verifyEmailSendFlow);
}

function* signupFlow({ payload }: PayloadAction<signupRequestPayload>) {
  const { email, pw, displayName } = payload;
  try {
    const { status } = yield call(authService.signup, { email, pw, displayName });
    if (status === 200) {
      yield put(signupSuccess({ status }));
    }
  } catch (err) {
    yield signupFailure({ err });
  }
}

function* watchSignupFlow() {
  yield takeLatest(signupRequest, signupFlow);
}

function* checkExistEmailFlow({ payload }: PayloadAction<{ email: string }>) {
  const { email } = payload;
  try {
    const { status } = yield call(authService.checkExistEmail, { email });
    if (status === 200) {
      yield put(checkExistEmailSuccess({ status }));
    }
  } catch (err) {
    yield put(checkExistEmailFailure({ err }));
  }
}

function* debounceCheckExistEmailFlow() {
  yield debounce(300, checkExistEmailRequest, checkExistEmailFlow);
}

export default function* signupSaga() {
  yield all([fork(watchVerifyFlow), fork(watchSignupFlow), fork(debounceCheckExistEmailFlow)]);
}
