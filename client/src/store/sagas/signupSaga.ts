import { put, all, call, fork, delay, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  verifyEmailSendRequest,
  verifyEmailSendSuccess,
  verifyEmailSendFailure,
  removeVerifyCodeAndEmail,
  VerifyEmailSendRequestPayload,
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
      yield put(removeVerifyCodeAndEmail());
    }
  } catch (err) {
    verifyEmailSendFailure({ err });
  }
}

function* watchVerifyFlow() {
  yield takeLatest(verifyEmailSendRequest, verifyEmailSendFlow);
}

export default function* signupSaga() {
  yield all([fork(watchVerifyFlow)]);
}
