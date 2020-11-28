import { all, fork, take, call, put } from 'redux-saga/effects';
import API from '@/api';
import {
  getThreadRequest,
  getThreadSuccess,
  getThreadFailure,
  getThreadRequestPayload,
} from '@/store/modules/thread';

const getThreadListAPI = ({ channelId }: getThreadRequestPayload) => {
  return API.get(`/api/threads/channels/${channelId}`);
};

function* getThreadList({ channelId }: getThreadRequestPayload) {
  try {
    const result = yield call(getThreadListAPI, { channelId });
    yield put(getThreadSuccess({ threadList: result.data.threadList }));
  } catch (err) {
    yield put(getThreadFailure(err));
  }
}

function* watchGetThreadList() {
  while (true) {
    const {
      payload: { channelId },
    } = yield take(getThreadRequest);

    yield fork(getThreadList, { channelId });
  }
}

export default function* threadSaga() {
  yield all([fork(watchGetThreadList)]);
}
