import { put, all, call, take, fork, cancel, cancelled } from 'redux-saga/effects';
import { AUTH_ACTIONS, UserLoginPayload } from '@/store/modules/auth';
import { authService } from '@/services';

function* login({ email, pw }: UserLoginPayload) {
  try {
    const { data, status } = yield call(authService.login, { email, pw });
    const { accessToken, refreshToken } = data;
    if (status === 200) {
      yield put(AUTH_ACTIONS.loginSuccess({ accessToken, refreshToken }));
    }
  } catch (err) {
    yield put(AUTH_ACTIONS.loginFailure());
  } finally {
    if (yield cancelled()) {
      yield put(AUTH_ACTIONS.loginCancelled());
    }
  }
}

function* logout() {
  try {
    const { status } = yield call(authService.logout);
    if (status === 200) {
      yield put(AUTH_ACTIONS.logoutSuccess());
    }
  } catch (err) {
    yield put(AUTH_ACTIONS.logoutFailure());
  }
}

function* watchAuthFlow() {
  while (true) {
    const {
      payload: { email, pw },
    } = yield take(AUTH_ACTIONS.loginRequest);
    const loginTask = yield fork(login, { email, pw });
    const action = yield take([AUTH_ACTIONS.logoutRequest, AUTH_ACTIONS.loginFailure]);
    if (action.type === AUTH_ACTIONS.logoutRequest().type) {
      yield cancel(loginTask);
      yield fork(logout);
    }
  }
}

export default function* authSaga() {
  yield all([watchAuthFlow()]);
}
