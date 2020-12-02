import { all, fork, takeEvery, call, put, takeLatest } from 'redux-saga/effects';
import { channelService } from '@/services';
import { Channel, JoinUser } from '@/types';
import {
  loadChannelsRequest,
  loadChannelsSuccess,
  loadChannelsFailure,
  loadMyChannelsRequest,
  loadMyChannelsSuccess,
  loadMyChannelsFailure,
  loadChannelRequest,
  loadChannelSuccess,
  loadChannelFailure,
  createChannelRequest,
  createChannelSuccess,
  createChannelFailure,
  joinChannelRequset,
  joinChannelSuccess,
  joinChannelFailure,
} from '../modules/channel';

function* loadChannels() {
  try {
    const result = yield call(channelService.getChannels);
    yield put(loadChannelsSuccess({ channelList: result.data.channelList }));
  } catch (err) {
    yield put(loadChannelsFailure(err));
  }
}

function* loadMyChannels(action: any) {
  try {
    const result = yield call(channelService.getJoinChannels, { userId: action.payload });
    yield put(loadMyChannelsSuccess({ joinChannelList: result.data.channelList }));
  } catch (err) {
    yield put(loadMyChannelsFailure(err));
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

function* createChannel(action: any) {
  try {
    const { ownerId, channelType, isPublic, name, description, displayName } = action.payload;
    const result = yield call(channelService.createChannel, {
      ownerId,
      channelType,
      isPublic,
      name,
      description,
    });

    const channel: Channel = {
      id: result.data.channel.insertId,
      channelType: 1,
      description,
      isPublic,
      name,
      topic: '',
      ownerId,
      memberCount: 1,
    };

    const joinUser: JoinUser = {
      displayName,
      userId: ownerId,
      image:
        'https://user-images.githubusercontent.com/61396464/100354475-99660f00-3033-11eb-8304-797b93dff986.jpg',
    };
    yield call(channelService.joinChannel, { userId: ownerId, channelId: channel.id });
    yield put(createChannelSuccess({ channel, joinUser }));
  } catch (err) {
    yield put(createChannelFailure(err));
  }
}

function* joinChannel(action: any) {
  try {
    const { userId, channelId } = action.payload;
    yield call(channelService.joinChannel, { userId, channelId });
  } catch (err) {
    yield put(joinChannelFailure(err));
  }
}

function* watchLoadChannels() {
  yield takeEvery(loadChannelsRequest, loadChannels);
}

function* watchLoadJoinChannels() {
  yield takeEvery(loadMyChannelsRequest, loadMyChannels);
}

function* watchLoadChannel() {
  yield takeLatest(loadChannelRequest, loadChannel);
}

function* watchCreateChannel() {
  yield takeLatest(createChannelRequest, createChannel);
}

function* watchJoinChannel() {
  yield takeEvery(joinChannelRequset, joinChannel);
}

export default function* channelSaga() {
  yield all([
    fork(watchLoadChannels),
    fork(watchLoadJoinChannels),
    fork(watchCreateChannel),
    fork(watchLoadChannel),
    fork(watchJoinChannel),
  ]);
}
