import { all, fork, takeEvery, call, put, take } from 'redux-saga/effects';
import API from '@/api';
import {
  getSubThreadRequest,
  getSubThreadSuccess,
  getSubThreadFailure,
  getSubThreadRequestPayload,
} from '@/store/modules/subThread';

const getSubThreadListAPI = ({ parentId }: getSubThreadRequestPayload) => {
  const url = `/api/threads/${parentId}`;
  return API.get(url);
};

function* getSubThreadList({ parentId }: getSubThreadRequestPayload) {
  try {
    const result = yield call(getSubThreadListAPI, { parentId });
    console.log(result);
    yield put(getSubThreadSuccess({ subThreadList: result.data.subThreadList }));
  } catch (err) {
    yield put(getSubThreadFailure(err));
  }
}

function* watchGetThreadList() {
  // yield takeEvery(getSubThreadRequest, getSubThreadList);
  while (true) {
    const {
      payload: { parentId },
    } = yield take(getSubThreadRequest);

    yield fork(getSubThreadList, { parentId });
    // const action = yield take([logoutRequest, loginFailure]);
  }
}

export default function* subThreadSaga() {
  yield all([fork(watchGetThreadList)]);
}
