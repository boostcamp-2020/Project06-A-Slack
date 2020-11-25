import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { loadChannelsRequest, loadChannelsSuccess, loadChannelsFalse } from '../modules/channels';

function loadChannelsAPI() {
  const accessToken = localStorage.getItem('accessToken');
  return axios.get('/api/channels', { headers: { Authorization: `Bearer ${accessToken}` } });
}

function* loadChannels(action: any) {
  try {
    const result = yield call(loadChannelsAPI);
    console.log(result);
    yield put(loadChannelsSuccess({ channelList: result.data.channelList }));
  } catch (err) {
    console.log('데이터 패칭 실패');
    yield put(loadChannelsFalse(err));
  }
}

function* watchLoadChannels() {
  console.log('1번 실행');
  yield takeEvery(loadChannelsRequest, loadChannels);
}

export default function* channelSaga() {
  yield all([fork(watchLoadChannels)]);
}
