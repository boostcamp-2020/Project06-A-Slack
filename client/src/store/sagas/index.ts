import { all, fork } from 'redux-saga/effects';
import authSaga from './authSaga';
import channelSaga from './channelSaga';
import threadSaga from './threadSaga';
import userSaga from './userSaga';
import subThreadSaga from './subThreadSaga';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(channelSaga),
    fork(threadSaga),
    fork(userSaga),
    fork(subThreadSaga),
  ]);
}
