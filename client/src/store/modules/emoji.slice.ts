/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface emoji {
  id: number;
  name: string;
  url: string;
}

interface EmojiState {
  emojiList: emoji[] | null;
}

const emojiState: EmojiState = {
  emojiList: [],
};

const emojiSlice = createSlice({
  name: 'emoji',
  initialState: emojiState,
  reducers: {
    getEmojiListRequest() {},
    getEmojiListSuccess(state, action: PayloadAction<EmojiState>) {
      state.emojiList = action.payload.emojiList;
    },
    getEmojiListFailure(state, action) {},
    clickEmojiRequest() {},
    clickEmojiSuccess() {},
    clickEmojiFailure() {},
    createEmojiRequest(state, action) {},
    createEmojiSuccess(state, action) {},
    createEmojiFailure(state, action) {},
  },
});

export const EMOJI = emojiSlice.name;
export const {
  getEmojiListRequest,
  getEmojiListSuccess,
  getEmojiListFailure,
  createEmojiRequest,
  createEmojiSuccess,
  createEmojiFailure,
} = emojiSlice.actions;

export default emojiSlice.reducer;
