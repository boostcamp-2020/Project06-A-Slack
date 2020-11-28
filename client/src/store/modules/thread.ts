/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Thread } from '@/types';
import { RootState } from '@/store/modules';

interface ThreadList {
  threadList: Thread[] | null;
}
const threadState: Thread = {
  id: 0,
  userId: 0,
  channelId: 0,
  parentId: null,
  content: '첫번째 쓰레드를 작성해주세요! 😀',
  url: '',
  isEdited: 0,
  isPinned: 0,
  createdAt: '',
  emoji: [],
  subCount: 0,
  subThreadUserId1: null,
  subThreadUserId2: null,
  subThreadUserId3: null,
};

const threadListState: ThreadList = {
  threadList: [threadState],
};

export interface getThreadRequestPayload {
  channelId: number;
}

// 리듀서
const threadSlice = createSlice({
  name: 'thread',
  initialState: threadListState,
  reducers: {
    getThreadRequest(state, action: PayloadAction<getThreadRequestPayload>) {},
    getThreadSuccess(state, action: PayloadAction<ThreadList>) {
      state.threadList = action.payload.threadList;
    },
    getThreadFailure(state, action) {},
  },
});

export const THREAD = threadSlice.name;
export const { getThreadRequest, getThreadSuccess, getThreadFailure } = threadSlice.actions; // action 나눠서 export 하기

export default threadSlice.reducer;
