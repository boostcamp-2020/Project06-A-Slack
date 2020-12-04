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
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
} from '@/store/modules/user.slice';
import { userService } from '@/services';
import { USER_DEFAULT_PROFILE_URL } from '@/utils/constants';

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
    const {
      userId,
      displayName,
      phoneNumber,
      profileImage,
      previousFileName,
      handleClose,
    } = action.payload;
    const formData = new FormData();
    formData.append('displayName', displayName);
    formData.append('phoneNumber', phoneNumber);

    let setDefault = false;

    if (typeof profileImage === 'string') {
      formData.append('setDefault', '0');
    } else if (profileImage) {
      formData.append('setDefault', '0');
      formData.append('image', profileImage);
      if (previousFileName) {
        formData.append('previousFileName', previousFileName);
      }
    } else {
      formData.append('setDefault', '1');
      setDefault = true;
      if (previousFileName) {
        formData.append('previousFileName', previousFileName);
      }
    }

    const {
      data: { image },
      status,
    } = yield call(userService.editUser, { id: userId, formData });
    if (status === 200) {
      yield put(editUserSuccess({ userId, displayName, phoneNumber, image, setDefault }));
      handleClose();
    }
  } catch (err) {
    yield put(editUserFailure({ err }));
  }
}

function* watchEditUser() {
  yield takeLatest(editUserRequest, editUser);
}

function* getUsers() {
  try {
    const { data, status } = yield call(userService.getUsers);
    console.log(data, status);
    if (status === 200) {
      yield put(getUsersSuccess({ usersInfo: data.users }));
    }
  } catch (err) {
    yield put(getUsersFailure());
  }
}

function* watchGetUsers() {
  yield takeEvery(getUsersRequest, getUsers);
}

export default function* userSaga() {
  yield all([fork(watchGetUser), fork(watchEditUser), fork(watchGetUsers)]);
}
