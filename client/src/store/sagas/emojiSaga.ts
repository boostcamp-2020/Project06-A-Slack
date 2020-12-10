import { all, fork, take, call, takeEvery, put } from 'redux-saga/effects';
import {
  getEmojiListRequest,
  getEmojiListSuccess,
  getEmojiListFailure,
  createEmojiRequest,
  createEmojiSuccess,
  createEmojiFailure,
} from '@/store/modules/emoji.slice';
import { emojiService } from '@/services/emoji.service';

function* getEmojiList() {
  try {
    const { data, status } = yield call(emojiService.getEmojiList);
    if (status === 200) {
      yield put(getEmojiListSuccess({ emojiList: data.emojiList }));
    }
  } catch (err) {
    yield put(getEmojiListFailure(err));
  }
}

function* watchGetEmojiList() {
  yield takeEvery(getEmojiListRequest, getEmojiList);
}

export default function* EmojiSaga() {
  yield all([fork(watchGetEmojiList)]);
}
