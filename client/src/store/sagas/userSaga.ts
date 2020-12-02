import { put, all, takeEvery, call, fork, takeLatest, delay } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  getUserRequest,
  getUserSuccess,
  getUserFailure,
  editUserRequest,
  editUserSuccess,
  editUserFailure,
  EditUserRequestPayload,
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

function* editUser(action: PayloadAction<EditUserRequestPayload>) {
  try {
    const { userId, displayName, phoneNumber, handleClose } = action.payload;
    const { data, status } = yield call(userService.editUser, {
      id: userId,
      displayName,
      phoneNumber,
    });
    if (status === 200) {
      yield put(editUserSuccess({ userId, displayName, phoneNumber }));
      handleClose();
    }
  } catch (err) {
    yield put(editUserFailure({ err }));
  }
}

function* watchEditUser() {
  yield takeLatest(editUserRequest, editUser);
}

export default function* userSaga() {
  yield all([fork(watchGetUser), fork(watchEditUser)]);
}
