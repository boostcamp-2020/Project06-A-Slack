import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { THREAD_ACTIONS } from '../modules/thread';

// action 생성
const GET_THREADS = 'GET_THREADS';

const getThreadListAPI = () => {
  const accessToken = localStorage.getItem('accessToken');
  return axios.get('/api/threads/channels/1', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

// 액션 -> 리듀서 사이 미들웨어
function* getThreadList(action: any) {
  try {
    const result = yield call(getThreadListAPI);
    console.log(result);
    yield put(THREAD_ACTIONS.getThreadSuccess({ threadList: result.data.threadList }));
  } catch (err) {
    yield put(THREAD_ACTIONS.getThreadFailure(err));
  }
}

// const createPromiseSaga = (type, promiseCreator) => {
//   const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
//   return function* saga(action) {
//     try {
//       // 재사용성을 위하여 promiseCreator 의 파라미터엔 action.payload 값을 넣도록 설정합니다.
//       const payload = yield call(promiseCreator, action.payload);
//       yield put({ type: SUCCESS, payload });
//     } catch (e) {
//       yield put({ type: ERROR, error: true, payload: e });
//     }
//   };
// };

// const getThreadList = createPromiseSaga(GET_THREADS, getThreadListAPI);

function* watchGetThreadList() {
  yield takeEvery(THREAD_ACTIONS.getThreadRequest, getThreadList);
}

export default function* threadSaga() {
  yield all([fork(watchGetThreadList)]);
}
