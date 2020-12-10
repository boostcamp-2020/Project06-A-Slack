/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Emoji {
  id: number;
  name: string;
  url: string;
}

interface EmojiState {
  emojiList: Emoji[] | null;
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
