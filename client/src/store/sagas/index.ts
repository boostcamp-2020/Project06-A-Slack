import { all, fork } from 'redux-saga/effects';
import authSaga from './authSaga';
import channelSaga from './channelSaga';
import threadSaga from './threadSaga';
import userSaga from './userSaga';
import signupSage from './signupSaga';
import subThreadSaga from './subThreadSaga';
import socketSaga from './socketSaga';
import emojiSaga from './emojiSaga';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(channelSaga),
    fork(threadSaga),
    fork(userSaga),
    fork(signupSage),
    fork(subThreadSaga),
    fork(socketSaga),
    fork(emojiSaga),
  ]);
}
