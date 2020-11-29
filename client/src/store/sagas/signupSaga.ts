import { put, all, call, fork, delay, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  verifyEmailSendRequest,
  verifyEmailSendSuccess,
  verifyEmailSendFailure,
  removeVerifyCode,
  VerifyEmailSendRequestPayload,
} from '@/store/modules/signup';
import { authService } from '@/services';
import { TIME } from '@/utils/constants';

function* verifyEmailSendFlow({
  payload: { email },
}: PayloadAction<VerifyEmailSendRequestPayload>) {
  try {
    const {
      data: { verifyCode },
      status,
    } = yield call(authService.verifyEmail, { email });
    if (status === 200) {
      yield put(verifyEmailSendSuccess({ verifyCode }));
      yield delay(TIME.FIVE_MINUTE);
      yield put(removeVerifyCode());
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
