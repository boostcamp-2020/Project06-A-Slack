import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { getThreadRequest, getThreadSuccess, getThreadFailure } from '../modules/thread';

const getThreadListAPI = () => {
  const accessToken = localStorage.getItem('accessToken');
  return axios.get('/api/threads/channels/1', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
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
