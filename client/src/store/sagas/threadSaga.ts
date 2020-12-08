import { all, fork, take, call, takeEvery, put } from 'redux-saga/effects';
import {
  getThreadRequest,
  getThreadSuccess,
  getThreadFailure,
  createThreadRequest,
  createThreadSuccess,
  createThreadFailure,
  getThreadRequestPayload,
  createThreadRequestPayload,
} from '@/store/modules/thread.slice';
import { threadService } from '@/services/thread.service';

function* getThreadList({ channelId }: getThreadRequestPayload) {
  try {
    const result = yield call(threadService.getThreadList, { channelId });
    yield put(getThreadSuccess({ threadList: result.data.threadList, canScroll: true }));
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

function* createThread({ content, userId, channelId, parentId }: createThreadRequestPayload) {
  try {
    const result = yield call(threadService.createThread, {
      content,
      userId,
      channelId,
      parentId,
    });
    yield put(createThreadSuccess({ result: result.data.result }));
  } catch (err) {
    yield put(createThreadFailure(err));
  }
}

function* watchcreateThread() {
  while (true) {
    const {
      payload: { content, userId, channelId, parentId },
    } = yield take(createThreadRequest);
    yield fork(createThread, { content, userId, channelId, parentId });
  }
}

export default function* threadSaga() {
  yield all([fork(watchGetThreadList), fork(watchcreateThread)]);
}
