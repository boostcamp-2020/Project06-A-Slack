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
  createdAt: 'string',
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
    getThreadRequest(state) {
      console.log('req 보냄');
    },
    getThreadSuccess(state, action) {
      state.threadList = action.payload.threadList;
    },
    getThreadFailure(state, action) {},
  },
});

const selectThreadState = (state: RootState) => state.thread;

export const selectTHREAD = createSelector([selectThreadState], (thread) => thread);
export const THREAD = threadSlice.name;
export const THREAD_ACTIONS = threadSlice.actions;

export default threadSlice.reducer;
