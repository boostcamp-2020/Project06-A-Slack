import { all, fork, takeEvery, call, put, takeLatest } from 'redux-saga/effects';
import { channelService } from '@/services';
import {
  loadChannelsRequest,
  loadChannelsSuccess,
  loadChannelsFailure,
  loadJoinChannelsRequest,
  loadJoinChannelsSuccess,
  loadJoinChannelsFailure,
  loadChannelRequest,
  loadChannelSuccess,
  loadChannelFailure,
  makeChannelRequest,
  makeChannelSuccess,
  makeChannelFailure,
} from '../modules/channel';

function* loadChannels() {
  try {
    const result = yield call(channelService.getChannels);
    yield put(loadChannelsSuccess({ channelList: result.data.channelList }));
  } catch (err) {
    yield put(loadChannelsFailure(err));
  }
}

function* loadJoinChannels(action: any) {
  try {
    console.log(action.payload);
    const result = yield call(channelService.getJoinChannels, { userId: action.payload });
    yield put(loadJoinChannelsSuccess({ joinChannelList: result.data.channelList }));
  } catch (err) {
    yield put(loadJoinChannelsFailure(err));
  }
}

function* loadChannel(action: any) {
  try {
    const result = yield call(channelService.getChannel, { channelId: action.payload });
    yield put(loadChannelSuccess({ channel: result.data.channel, users: result.data.users }));
  } catch (err) {
    yield put(loadChannelFailure(err));
  }
}

function* makeChannel(action: any) {
  /*
  channelType: string;
  description: string;
  id: number;
  isPublic: number;
  memberCount: number;
  name: string;
  ownerId: number;
  */
}

function* watchLoadChannels() {
  yield takeEvery(loadChannelsRequest, loadChannels);
}

function* watchLoadJoinChannels() {
  yield takeEvery(loadJoinChannelsRequest, loadJoinChannels);
}

function* watchLoadChannel() {
  yield takeLatest(loadChannelRequest, loadChannel);
}

// function* watchMakeChannel() {
//   yiled takeLatest(makeChannelRequest, )
// }

export default function* channelSaga() {
  yield all([fork(watchLoadChannels), fork(watchLoadJoinChannels), fork(watchLoadChannel)]);
}
