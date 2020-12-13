import { put, all, takeEvery, call, fork, takeLatest, debounce } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  getUserRequest,
  getUserSuccess,
  getUserFailure,
  editUserRequest,
  editUserSuccess,
  editUserFailure,
  EditUserRequestPayload,
  matchedUsersRequest,
  matchedUsersSuccess,
  matchedUsersFailure,
} from '@/store/modules/user.slice';
import { userService } from '@/services';
import { User } from '@/types';
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

function* setMatchedUsers({
  payload,
}: {
  payload: { isDM: boolean; pickUsers: User[]; displayName: string; channelId: number };
}) {
  try {
    if (payload.displayName.length === 0) {
      yield put(matchedUsersSuccess({ matchedUsersInfo: [] }));
    } else {
      const { data, status } = yield call(userService.matchedUsers, {
        displayName: payload.displayName,
        channelId: payload.channelId,
        isDM: payload.isDM,
      });

      const matchedUsersInfo = data.matchedUsersInfo.reduce((acc: User[], cur: User) => {
        if (payload.pickUsers.every((pu) => cur.id !== pu.id)) {
          acc.push(cur);
        }
        return acc;
      }, []);

      if (status === 200) {
        yield put(matchedUsersSuccess({ matchedUsersInfo }));
      }
    }
  } catch (err) {
    yield put(matchedUsersFailure({ err }));
  }
}

function* watchMatchedUserRequest() {
  yield takeLatest(matchedUsersRequest, setMatchedUsers);
}

export default function* userSaga() {
  yield all([fork(watchGetUser), fork(watchEditUser), fork(watchMatchedUserRequest)]);
}
