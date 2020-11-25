import { all, fork } from 'redux-saga/effects';
import authSaga from './authSaga';
import channelSaga from './channelSaga';

export default function* rootSaga() {
  yield all([fork(authSaga), fork(channelSaga)]);
}
