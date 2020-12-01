/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Thread, initialThread } from '@/types';

interface ThreadList {
  threadList: Thread[] | null;
}

const threadListState: ThreadList = {
  threadList: [initialThread],
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
