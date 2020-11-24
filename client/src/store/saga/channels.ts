import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { loadChannelsRequest, loadChannelsSuccess, loadChannelsFalse } from '../channels';

function loadChannelsAPI(data: any) {
  console.log('3번 실행');
  return axios.get('http://localhost:3000/api/channels');
}

function* loadChannels(action: any) {
  console.log('2번 실행');

  try {
    const result = yield call(loadChannelsAPI, action.data);
    yield put(loadChannelsSuccess(result.data));
    console.log('데이터 패칭 성공');
  } catch (err) {
    console.log('데이터 패칭 실패');
    yield put(loadChannelsFalse(err));
  }
}

function* watchLoadChannels() {
  console.log('1번 실행');
  yield takeLatest(loadChannelsRequest, loadChannels);
}

export default function* channelSaga() {
  yield all([fork(watchLoadChannels)]);
}
