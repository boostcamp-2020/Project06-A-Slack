import { put, all, call, fork, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  loadNotJoinedChannelsRequest,
  loadNotJoinedChannelsSuccess,
  loadNotJoinedChannelsFailure,
  FindNotJoinedChannelListRequestPayload,
} from '@/store/modules/findChannel.slice';
import { userService } from '@/services';

function* notJoinedChannels({
  payload: { userId },
}: PayloadAction<FindNotJoinedChannelListRequestPayload>) {
  try {
    const { data, status } = yield call(userService.getNotJoinedChannels, { userId });
    if (status === 200) {
      yield put(loadNotJoinedChannelsSuccess({ notJoinedChannelList: data.notJoinedChannelList }));
    }
  } catch (err) {
    loadNotJoinedChannelsFailure({ err });
  }
}

function* watchNotJoinedChannels() {
  yield takeEvery(loadNotJoinedChannelsRequest, notJoinedChannels);
}

export default function* findChannelSaga() {
  yield all([fork(watchNotJoinedChannels)]);
}
