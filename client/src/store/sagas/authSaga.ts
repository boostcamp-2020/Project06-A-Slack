import { put, all, call, take, fork, cancel, cancelled, takeEvery } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  loginCancelled,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  LoginRequestPayload,
} from '@/store/modules/auth';
import { authService } from '@/services';

function* login({ email, pw }: LoginRequestPayload) {
  try {
    const { data, status } = yield call(authService.login, { email, pw });
    const { accessToken, refreshToken, user } = data;
    if (status === 200) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      yield put(loginSuccess({ accessToken, refreshToken, user }));
    }
  } catch (err) {
    yield put(loginFailure());
  } finally {
    if (yield cancelled()) {
      yield put(loginCancelled());
    }
  }
}

function* logout() {
  try {
    const { status } = yield call(authService.logout);
    if (status === 200) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      yield put(logoutSuccess());
    }
  } catch (err) {
    yield put(logoutFailure());
  }
}

function* loginFlow() {
  while (true) {
    const {
      payload: { email, pw },
    } = yield take(loginRequest);

    const loginTask = yield fork(login, { email, pw });
    const action = yield take([logoutRequest, loginFailure]);

    if (action.type === logoutRequest().type) {
      yield cancel(loginTask);
    }
  }
}

function* logoutFlow() {
  while (true) {
    yield take(logoutRequest);
    yield fork(logout);
  }
}

export default function* authSaga() {
  yield all([fork(loginFlow), fork(logoutFlow)]);
}
