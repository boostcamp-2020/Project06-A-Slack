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
  addThreadListRequest,
  addThreadListSuccess,
  addThreadListFailure,
  addThreadRequestPayload,
} from '@/store/modules/thread.slice';
import { threadService } from '@/services/thread.service';
import { PayloadAction } from '@reduxjs/toolkit';

function* getThreadList({ payload }: PayloadAction<getThreadRequestPayload>) {
  const { channelId } = payload;
  try {
    const { data, status } = yield call(threadService.getThreadList, { channelId });
    const { threadList, nextThreadId } = data;
    if (status === 200) {
      yield put(getThreadSuccess({ threadList, canScroll: true, nextThreadId }));
    }
  } catch (err) {
    yield put(getThreadFailure(err));
  }
}

function* watchGetThreadList() {
  yield takeEvery(getThreadRequest, getThreadList);
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

function* addThreadList({ payload }: PayloadAction<addThreadRequestPayload>) {
  const { channelId, nextThreadId: nid } = payload;
  try {
    const { data, status } = yield call(threadService.getThreadList, {
      channelId,
      nextThreadId: nid,
    });
    const { threadList, nextThreadId } = data;
    if (status === 200) {
      yield put(addThreadListSuccess({ threadList, nextThreadId }));
    }
  } catch (err) {
    yield put(addThreadListFailure());
  }
}

function* watchAddThreadList() {
  yield takeEvery(addThreadListRequest, addThreadList);
}

export default function* threadSaga() {
  yield all([fork(watchGetThreadList), fork(watchcreateThread), fork(watchAddThreadList)]);
}
