import { all, fork, call, put, take } from 'redux-saga/effects';
import {
  getSubThreadRequest,
  getSubThreadSuccess,
  getSubThreadFailure,
  GetSubThreadRequestPayload,
} from '@/store/modules/subThread.slice';
import { subThreadService } from '@/services/subThread.service';

function* getSubThreadList({ parentId }: GetSubThreadRequestPayload) {
  try {
    const { data, status } = yield call(subThreadService.getSubThreadList, { parentId });
    if (status === 200) {
      const [parentThreadData] = data.parentThread;

      yield put(
        getSubThreadSuccess({
          parentThread: parentThreadData,
          subThreadList: data.subThreadList,
        }),
      );
    }
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
