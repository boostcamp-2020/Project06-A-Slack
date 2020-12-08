import { all, fork, takeEvery, call, put, takeLatest } from 'redux-saga/effects';
import { channelService } from '@/services';
import { Channel, JoinedUser, User } from '@/types';
import { PayloadAction } from '@reduxjs/toolkit';

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
  modifyTopicRequest,
  modifyTopicSuccess,
  modifyTopicFailure,
  createChannelRequest,
  createChannelSuccess,
  createChannelFailure,
  joinChannelRequset,
  joinChannelSuccess,
  joinChannelFailure,
  modifyLastChannelRequestPayload,
  modifyTopicChannelRequestPayload,
  joinChannelRequsetPayload,
} from '../modules/channel.slice';

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
    const result = yield call(channelService.getChannel, { channelId: action.payload.channelId });
    yield put(loadChannelSuccess({ channel: result.data.channel, users: result.data.users }));
    yield call(channelService.modifyLastChannel, {
      lastChannelId: action.payload.channelId,
      userId: action.payload.userId,
    });
  } catch (err) {
    yield put(loadChannelFailure(err));
  }
}

function* createChannel(action: any) {
  try {
    const { ownerId, channelType, isPublic, name, description, users } = action.payload;
    const result = yield call(channelService.createChannel, {
      ownerId,
      channelType,
      isPublic,
      name,
      description,
      memberCount: users.length,
    });

    const channel: Channel = {
      id: result.data.channel.insertId,
      channelType,
      description,
      isPublic,
      name,
      topic: '',
      ownerId,
      memberCount: users.length,
    };

    const joinedUser: JoinedUser = {
      userId: ownerId,
      displayName: users[0].id,
      image: users[0].image,
    };

    yield put(createChannelSuccess({ channel, joinedListUser: [joinedUser] }));
    yield call(channelService.joinChannel, { users, channelId: result.data.channel.insertId });
  } catch (err) {
    yield put(createChannelFailure(err));
  }
}

function* joinChannel({ payload: { users, channelId } }: PayloadAction<joinChannelRequsetPayload>) {
  try {
    yield call(channelService.joinChannel, { users, channelId });
    const { data, status } = yield call(channelService.getChannel, { channelId });
    if (status === 200) {
      yield put(joinChannelSuccess({ users: data.users }));
    }
  } catch (err) {
    yield put(joinChannelFailure(err));
  }
}

function* modifyTopicChannel(action: any) {
  try {
    const { channelId, topic } = action.payload;
    yield call(channelService.modifyChannelTopic, { channelId, topic });
    yield put(modifyTopicSuccess({ channelId }));
  } catch (err) {
    yield put(modifyTopicFailure({ err }));
  }
}

function* watchLoadChannels() {
  yield takeEvery(loadChannelsRequest, loadChannels);
}

function* watchLoadMyChannels() {
  yield takeEvery(loadMyChannelsRequest, loadMyChannels);
}

function* watchLoadChannel() {
  yield takeLatest(loadChannelRequest, loadChannel);
}

function* watchCreateChannel() {
  yield takeLatest(createChannelRequest, createChannel);
}

function* watchJoinChannel() {
  yield takeLatest(joinChannelRequset, joinChannel);
}

function* watchModifyTopicChannel() {
  yield takeLatest(modifyTopicRequest, modifyTopicChannel);
}
export default function* channelSaga() {
  yield all([
    fork(watchLoadChannels),
    fork(watchLoadMyChannels),
    fork(watchCreateChannel),
    fork(watchLoadChannel),
    fork(watchJoinChannel),
    fork(watchModifyTopicChannel),
  ]);
}
