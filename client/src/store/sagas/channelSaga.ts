import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import API from '@/api';
import { loadChannelsRequest, loadChannelsSuccess, loadChannelsFalse } from '../modules/channels';

function loadChannelsAPI() {
  return API.get('/api/channels');
}

function* loadChannels() {
  try {
    const result = yield call(loadChannelsAPI);
    yield put(loadChannelsSuccess({ channelList: result.data.channelList }));
  } catch (err) {
    yield put(loadChannelsFalse(err));
  }
}

function* watchLoadChannels() {
  yield takeEvery(loadChannelsRequest, loadChannels);
}

export default function* channelSaga() {
  yield all([fork(watchLoadChannels)]);
}
