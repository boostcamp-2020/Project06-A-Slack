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
  modifyLastChannelRequest,
  modifyLastChannelSuccess,
  modifyLastChannelFailure,
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
    const { data, status } = yield call(channelService.getChannels);
    if (status === 200) {
      yield put(loadChannelsSuccess({ channelList: data.channelList }));
    }
  } catch (err) {
    yield put(loadChannelsFailure(err));
  }
}

function* loadMyChannels(action: any) {
  try {
    const { data, status } = yield call(channelService.getJoinChannels, { userId: action.payload });
    if (status === 200) {
      yield put(loadMyChannelsSuccess({ joinChannelList: data.channelList }));
    }
  } catch (err) {
    yield put(loadMyChannelsFailure(err));
  }
}

function* loadChannel(action: any) {
  try {
    const { data, status } = yield call(channelService.getChannel, { channelId: action.payload });
    if (status === 200) {
      yield put(loadChannelSuccess({ channel: data.channel, users: data.users }));
    }
  } catch (err) {
    yield put(loadChannelFailure(err));
  }
}

function* createChannel(action: any) {
  try {
    const { ownerId, channelType, isPublic, name, description, displayName } = action.payload;
    const { data, status } = yield call(channelService.createChannel, {
      ownerId,
      channelType,
      isPublic,
      name,
      description,
    });

    if (status === 201) {
      const channel: Channel = {
        id: data.channel.insertId,
        channelType: 1,
        description,
        isPublic,
        name,
        topic: '',
        ownerId,
        memberCount: 1,
      };

      const joinedUser: JoinedUser = {
        displayName,
        userId: ownerId,
        image:
          'https://user-images.githubusercontent.com/61396464/100354475-99660f00-3033-11eb-8304-797b93dff986.jpg',
      };
      const { status: joinStatus } = yield call(channelService.joinChannel, {
        userId: ownerId,
        channelId: channel.id,
      });
      if (joinStatus === 200) {
        yield put(createChannelSuccess({ channel, joinedUser }));
      }
    }
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

function* modifyLastChannel({
  payload: { lastChannelId, userId },
}: PayloadAction<modifyLastChannelRequestPayload>) {
  try {
    const { status } = yield call(channelService.modifyLastChannel, {
      lastChannelId,
      userId,
    });
    if (status === 200) {
      yield put(modifyLastChannelSuccess());
    }
  } catch (err) {
    yield put(modifyLastChannelFailure({ err }));
  }
}

function* watchLoadChannels() {
  yield takeEvery(loadChannelsRequest, loadChannels);
}

function* watchLoadMyChannels() {
  yield takeEvery(loadMyChannelsRequest, loadMyChannels);
}

function* watchLoadChannel() {
  yield takeEvery(loadChannelRequest, loadChannel);
}

function* watchCreateChannel() {
  yield takeLatest(createChannelRequest, createChannel);
}

function* watchJoinChannel() {
  yield takeLatest(joinChannelRequset, joinChannel);
}

function* watchModifyLastChannel() {
  yield takeLatest(modifyLastChannelRequest, modifyLastChannel);
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
    fork(watchModifyLastChannel),
    fork(watchModifyTopicChannel),
  ]);
}
