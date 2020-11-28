import { all, fork, takeEvery, takeLatest, call, put, take } from 'redux-saga/effects';
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
    yield put(getSubThreadSuccess({ subThreadList: result.data.subThreadList }));
  } catch (err) {
    yield put(getSubThreadFailure(err));
  }
}

function* watchGetSubThreadList() {
  while (true) {
    const {
      payload: { parentId },
    } = yield take(getSubThreadRequest);

    yield fork(getSubThreadList, { parentId });
  }
}

export default function* subThreadSaga() {
  yield all([fork(watchGetSubThreadList)]);
}
