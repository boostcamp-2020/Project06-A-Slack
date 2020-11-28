/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Thread } from '@/types';
import { RootState } from '@/store/modules';

interface ThreadList {
  threadList: Thread[] | null;
}
const threadState: Thread = {
  id: 1,
  userId: 1,
  channelId: 1,
  parentId: null,
  content: 'init content',
  url: 'url/init',
  isEdited: 0,
  isPinned: 0,
  createdAt: '',
  emoji: [
    { name: 'emoji1', userId: 1 },
    { name: 'emoji1', userId: 2 },
  ],
};

const threadListState: ThreadList = {
  threadList: [threadState],
};

// 리듀서
const threadSlice = createSlice({
  name: 'thread',
  initialState: threadListState,
  reducers: {
    getThreadRequest(state) {},
    getThreadSuccess(state, action: PayloadAction<ThreadList>) {
      state.threadList = action.payload.threadList;
    },
    getThreadFailure(state, action) {},
  },
});

const selectThreadState = (state: RootState) => state.thread;

export const selectThread = createSelector(selectThreadState, (t) => t);
export const THREAD = threadSlice.name;
export const { getThreadRequest, getThreadSuccess, getThreadFailure } = threadSlice.actions; // action 나눠서 export 하기

export default threadSlice.reducer;
