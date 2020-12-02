import { put, all, takeEvery, call, fork, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  getUserRequest,
  getUserSuccess,
  getUserFailure,
  editUserRequest,
  editUserSuccess,
  editUserFailure,
  EditUserPayload,
} from '@/store/modules/user';
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

function* editUser(action: PayloadAction<EditUserPayload>) {
  try {
    const { userId, displayName, phoneNumber } = action.payload;
    const { data, status } = yield call(userService.editUser, {
      id: userId,
      displayName,
      phoneNumber,
    });
    console.log(data, status);
    yield put(editUserSuccess({ userId, displayName, phoneNumber }));
  } catch (err) {
    yield put(editUserFailure());
  }
}

function* watchEditUser() {
  yield takeLatest(editUserRequest, editUser);
}

export default function* userSaga() {
  yield all([fork(watchGetUser), fork(watchEditUser)]);
}
