import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import api from '@/api';
import { getThreadRequest, getThreadSuccess, getThreadFailure } from '@/store/modules/thread';

const getThreadListAPI = () => {
  return api.get('/api/threads/channels/1');
};

function* getThreadList() {
  try {
    const result = yield call(getThreadListAPI);
    yield put(getThreadSuccess({ threadList: result.data.threadList }));
  } catch (err) {
    yield put(getThreadFailure(err));
  }
}

function* watchGetThreadList() {
  yield takeEvery(getThreadRequest, getThreadList);
}

export default function* threadSaga() {
  yield all([fork(watchGetThreadList)]);
}
