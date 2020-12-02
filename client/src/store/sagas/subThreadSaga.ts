import { all, fork, takeEvery, takeLatest, call, put, take } from 'redux-saga/effects';
import {
  getSubThreadRequest,
  getSubThreadSuccess,
  getSubThreadFailure,
  GetSubThreadRequestPayload,
} from '@/store/modules/subThread';
import { subThreadService } from '@/services/subThread.service';

function* getSubThreadList({ parentId }: GetSubThreadRequestPayload) {
  try {
    const result = yield call(subThreadService.getSubThreadList, { parentId });
    const [parentThreadData] = result.data.parentThread;

    yield put(
      getSubThreadSuccess({
        parentThread: parentThreadData,
        subThreadList: result.data.subThreadList,
      }),
    );
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
