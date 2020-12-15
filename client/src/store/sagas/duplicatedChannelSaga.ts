import { all, fork, put, call, debounce } from 'redux-saga/effects';
import {
  checkDuplicateRequest,
  checkDuplicateSuccess,
  checkDuplicateFailure,
} from '@/store/modules/duplicatedChannel.slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { channelService } from '@/services';

function* checkDuplicatedChannel({ payload }: PayloadAction<{ channelName: string }>) {
  const { channelName } = payload;
  try {
    const { data, status } = yield call(channelService.checkDuplicatedChannel, { channelName });
    if (status === 200) {
      const { isDuplicated } = data;
      yield put(checkDuplicateSuccess({ isDuplicated }));
    }
  } catch (err) {
    yield put(checkDuplicateFailure({ err }));
  }
}

function* watchCheckDuplicatedChannel() {
  yield debounce(200, checkDuplicateRequest, checkDuplicatedChannel);
}

export default function* duplicatedChannelSaga() {
  yield all([fork(watchCheckDuplicatedChannel)]);
}
