import { all, fork } from 'redux-saga/effects';
import authSaga from './authSaga';
import channelSaga from './channelSaga';
import threadSaga from './threadSaga';

export default function* rootSaga() {
  yield all([fork(authSaga), fork(channelSaga), fork(threadSaga)]);
}
