import { all, fork, takeEvery, call, put, takeLatest, take } from 'redux-saga/effects';
import { channelService } from '@/services/channel.service';
import {
  loadChannelsRequest,
  loadChannelsSuccess,
  loadChannelsFailure,
  loadChannelRequest,
  loadChannelSuccess,
  loadChannelFailure,
} from '../modules/channel';

function loadChannelsAPI() {
  return channelService.getChannels();
}

function loadChannelAPI(channelId: number) {
  return channelService.getChannel({ channelId });
}

function* loadChannels() {
  try {
    const result = yield call(loadChannelsAPI);
    yield put(loadChannelsSuccess({ channelList: result.data.channelList }));
  } catch (err) {
    yield put(loadChannelsFailure(err));
  }
}

function* loadChannel(action: any) {
  console.log(action);
  try {
    const result = yield call(loadChannelAPI, action.payload);
    console.log(result);
    yield put(loadChannelSuccess({ channel: result.data.channel, users: result.data.users }));
  } catch (err) {
    yield put(loadChannelFailure(err));
  }
}

function* watchLoadChannels() {
  yield takeEvery(loadChannelsRequest, loadChannels);
}

function* watchLoadChannel() {
  yield takeLatest(loadChannelRequest, loadChannel);
}

export default function* channelSaga() {
  yield all([fork(watchLoadChannels), fork(watchLoadChannel)]);
}
