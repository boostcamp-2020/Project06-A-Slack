import { put, all, call, take, fork, cancel, cancelled } from 'redux-saga/effects';
import { authActions, LoginAction } from '@/store/modules/auth';
import { authService } from '@/services';

function* authorize({ email, pw }: LoginAction) {
  try {
    const { data, status } = yield call(authService.login, { email, pw });
    if (status === 200) {
      yield put(authActions.loginSuccess());
    }
  } catch (err) {
    yield put(authActions.loginFailure());
  } finally {
    if (yield cancelled()) {
      yield put(authActions.loginCancelled());
    }
  }
}

function* watchAuthFlow() {
  while (true) {
    const {
      payload: { email, pw },
    } = yield take(authActions.loginRequest);
    const loginTask = yield fork(authorize, { email, pw });
    const action = yield take([authActions.logoutRequest, authActions.loginFailure]);
    if (action === authActions.logoutRequest) {
      yield cancel(loginTask);
    }
  }
}

export default function* authSaga() {
  yield all([watchAuthFlow()]);
}
