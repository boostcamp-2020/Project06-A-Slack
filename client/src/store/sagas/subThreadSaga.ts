import { all, fork, takeEvery, takeLatest, call, put, take } from 'redux-saga/effects';
import {
  getSubThreadRequest,
  getSubThreadSuccess,
  getSubThreadFailure,
  GetSubThreadRequestPayload,
} from '@/store/modules/subThread';
import { subThreadService } from '@/services/subThread.service';

function* getSubThreadList({ parentId, parentThread }: GetSubThreadRequestPayload) {
  try {
    const result = yield call(subThreadService.getSubThreadList, { parentId });
    yield put(getSubThreadSuccess({ parentThread, subThreadList: result.data.subThreadList }));
  } catch (err) {
    yield put(getSubThreadFailure(err));
  }
}

function* watchGetSubThreadList() {
  while (true) {
    const {
      payload: { parentId, parentThread },
    } = yield take(getSubThreadRequest);

    yield fork(getSubThreadList, { parentId, parentThread });
  }
}

export default function* subThreadSaga() {
  yield all([fork(watchGetSubThreadList)]);
}
