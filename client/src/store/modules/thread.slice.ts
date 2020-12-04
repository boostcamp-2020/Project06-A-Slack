/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Thread, initialThread, ThreadResponse } from '@/types';

interface ThreadList {
  threadList: Thread[] | null;
}

const threadListState: ThreadList = {
  threadList: [initialThread],
};

export interface getThreadRequestPayload {
  channelId: number;
}

export interface createThreadRequestPayload {
  userId: number;
  channelId: number;
  content: string;
  parentId: number | null;
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
    createThreadRequest(state, action: PayloadAction<createThreadRequestPayload>) {},
    createThreadSuccess(state, action: PayloadAction<ThreadResponse>) {},
    createThreadFailure(state, action) {},
  },
});

export const THREAD = threadSlice.name;
export const {
  getThreadRequest,
  getThreadSuccess,
  getThreadFailure,
  createThreadRequest,
  createThreadSuccess,
  createThreadFailure,
} = threadSlice.actions; // action 나눠서 export 하기

export default threadSlice.reducer;
