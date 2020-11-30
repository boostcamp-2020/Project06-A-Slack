import { all, fork, take, call, takeEvery, put } from 'redux-saga/effects';
import {
  getThreadRequest,
  getThreadSuccess,
  getThreadFailure,
  getThreadRequestPayload,
} from '@/store/modules/thread';
import { threadService } from '@/services/thread.service';

function* getThreadList({ channelId }: getThreadRequestPayload) {
  try {
    const result = yield call(threadService.getThreadList, { channelId });
    yield put(getThreadSuccess({ threadList: result.data.threadList }));
  } catch (err) {
    yield put(getThreadFailure(err));
  }
}

function* watchGetThreadList() {
  // yield takeEvery(getThreadRequest, getThreadList, { channelId });
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
