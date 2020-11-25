import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import { channelsService } from '@/services/channels.service';
import { loadChannelsRequest, loadChannelsSuccess, loadChannelsFalse } from '../modules/channels';

function loadChannelsAPI() {
  return channelsService.getChannels();
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
