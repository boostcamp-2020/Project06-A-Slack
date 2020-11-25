import { put, all, call, take, fork, cancel, cancelled, takeEvery } from 'redux-saga/effects';
import { AUTH, AUTH_ACTIONS, LoginRequestPayload } from '@/store/modules/auth';
import { authService } from '@/services';

function* login({ email, pw }: LoginRequestPayload) {
  try {
    const { data, status } = yield call(authService.login, { email, pw });
    const { accessToken, refreshToken, user } = data;
    if (status === 200) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      yield put(AUTH_ACTIONS.loginSuccess({ accessToken, refreshToken, user }));
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
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      yield put(AUTH_ACTIONS.logoutSuccess());
    }
  } catch (err) {
    yield put(AUTH_ACTIONS.logoutFailure());
  }
}

function* loginFlow() {
  while (true) {
    const {
      payload: { email, pw },
    } = yield take(AUTH_ACTIONS.loginRequest);

    const loginTask = yield fork(login, { email, pw });
    const action = yield take([AUTH_ACTIONS.logoutRequest, AUTH_ACTIONS.loginFailure]);

    if (action.type === AUTH_ACTIONS.logoutRequest().type) {
      yield cancel(loginTask);
    }
  }
}

function* logoutFlow() {
  while (true) {
    yield take(AUTH_ACTIONS.logoutRequest);
    yield fork(logout);
  }
}

export default function* authSaga() {
  yield all([fork(loginFlow), fork(logoutFlow)]);
}
