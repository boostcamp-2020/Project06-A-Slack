/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Thread, initialThread, ThreadResponse } from '@/types';

interface ThreadState {
  threadList: Thread[] | null;
  canScroll: boolean;
}

const threadListState: ThreadState = {
  threadList: null,
  canScroll: false,
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
    getThreadSuccess(state, action: PayloadAction<ThreadState>) {
      state.threadList = action.payload.threadList;
      state.canScroll = action.payload.canScroll;
    },
    getThreadFailure(state, action) {},
    createThreadRequest(state, action: PayloadAction<createThreadRequestPayload>) {},
    createThreadSuccess(state, action: PayloadAction<ThreadResponse>) {},
    createThreadFailure(state, action) {},
    addThread(state, action) {
      if (state.threadList?.length) {
        state.threadList.push(action.payload.thread);
      } else {
        state.threadList = [action.payload.thread];
      }
    },
    updateSubThreadInfo(
      state,
      { payload }: PayloadAction<{ threadId: number; subThreadUserId: number }>,
    ) {
      const { threadId, subThreadUserId } = payload;
      const targetThread = state.threadList?.find((t) => t.id === threadId);
      if (targetThread) {
        targetThread.subCount += 1;

        const subThreadUserIdList = [
          targetThread.subThreadUserId1,
          targetThread.subThreadUserId2,
          targetThread.subThreadUserId3,
        ];

        if (!subThreadUserIdList.find((uid) => uid === subThreadUserId)) {
          const emptySpaceIdx: number = subThreadUserIdList.findIndex((s) => s === null);
          if (emptySpaceIdx !== -1) {
            const key = `subThreadUserId${emptySpaceIdx + 1}`;
            targetThread[key] = subThreadUserId;
          }
        }
      }
    },
    setScrollable(state, { payload }: PayloadAction<{ canScroll: boolean }>) {
      state.canScroll = payload.canScroll;
    },
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
  addThread,
  setScrollable,
  updateSubThreadInfo,
} = threadSlice.actions; // action 나눠서 export 하기

export default threadSlice.reducer;
