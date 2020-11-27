import { put, all, takeEvery, call, fork } from 'redux-saga/effects';
import { getUserRequest, getUserSuccess, getUserFailure } from '@/store/modules/user';
import { userService } from '@/services';

function* getUser({ payload }: { payload: { userId: number } }) {
  try {
    const { data, status } = yield call(userService.getUser, { id: payload.userId });
    if (status === 200) {
      yield put(getUserSuccess({ userInfo: data.user }));
    }
  } catch (err) {
    yield put(getUserFailure());
  }
}

function* watchGetUser() {
  yield takeEvery(getUserRequest, getUser);
}

export default function* userSaga() {
  yield all([fork(watchGetUser)]);
}
