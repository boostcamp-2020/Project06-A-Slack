import { all, fork, takeEvery, takeLatest, call, put, take } from 'redux-saga/effects';
import {
  getSubThreadRequest,
  getSubThreadSuccess,
  getSubThreadFailure,
  getSubThreadRequestPayload,
} from '@/store/modules/subThread';
import { subThreadService } from '@/services/subThread.service';

function* getSubThreadList({ parentId }: getSubThreadRequestPayload) {
  try {
    const result = yield call(subThreadService.getSubThreadList, { parentId });
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
