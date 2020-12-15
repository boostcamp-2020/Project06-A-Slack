/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmojiOfThread, Thread, ThreadResponse } from '@/types';

interface ThreadState {
  threadList: Thread[] | null;
  canScroll: boolean;
  loading: boolean;
  nextThreadId: number | null;
  firstScrollUsed: boolean;
  prevTopThreadId: number | null;
}

const threadListState: ThreadState = {
  threadList: null,
  canScroll: false,
  loading: false,
  nextThreadId: null,
  firstScrollUsed: false,
  prevTopThreadId: null,
};

export interface addThreadRequestPayload {
  channelId: number;
  nextThreadId: number;
}
export interface getThreadRequestPayload {
  channelId: number;
  nextThreadId?: number | null;
}
export interface getThreadSuccessPayload {
  threadList: Thread[];
  canScroll: boolean;
  nextThreadId: number | null;
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
    getThreadRequest(state, action: PayloadAction<getThreadRequestPayload>) {
      state.loading = true;
      state.nextThreadId = null;
      state.firstScrollUsed = false;
    },
    getThreadSuccess(state, action: PayloadAction<getThreadSuccessPayload>) {
      const { threadList, nextThreadId } = action.payload;
      state.loading = false;
      state.threadList = threadList;
      state.nextThreadId = nextThreadId;
    },
    getThreadFailure(state, action) {
      state.loading = false;
    },
    addThreadListRequest(state, { payload }: PayloadAction<addThreadRequestPayload>) {
      state.loading = true;
      state.prevTopThreadId = payload.nextThreadId;
    },
    addThreadListSuccess(
      state,
      action: PayloadAction<{ threadList: Thread[]; nextThreadId: number }>,
    ) {
      const { threadList, nextThreadId } = action.payload;
      state.loading = false;
      if (state.threadList && threadList.length) {
        state.threadList = threadList.concat(state.threadList);
      }
      state.nextThreadId = nextThreadId;
    },
    addThreadListFailure(state) {
      state.loading = false;
    },
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
    deleteThread(state, { payload }: PayloadAction<{ threadId: number }>) {
      const { threadId } = payload;
      const targetThread = state.threadList?.find((t) => t.id === threadId);
      if (targetThread) {
        targetThread.isDeleted = 1;
      }
    },
    updateAddSubThreadInfo(
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
    updateDeleteSubThreadInfo(state, { payload }: PayloadAction<{ thread: Thread }>) {
      const { thread } = payload;
      if (state.threadList) {
        const targetIdx = state.threadList?.findIndex((el) => el.id === thread.id);
        state.threadList[targetIdx] = thread;
      }
    },
    setScrollable(state, { payload }: PayloadAction<{ canScroll: boolean }>) {
      state.canScroll = payload.canScroll;
    },
    setFirstScrollUsed(state, { payload }: PayloadAction<{ firstScrollUsed: boolean }>) {
      state.firstScrollUsed = payload.firstScrollUsed;
    },
    resetNextThreadId(state) {
      state.nextThreadId = null;
    },
    changeEmojiOfThread(
      state,
      { payload }: PayloadAction<{ emoji: EmojiOfThread[]; threadId: number }>,
    ) {
      const targetThread = state.threadList?.find(
        (thread) => Number(thread.id) === Number(payload.threadId),
      );
      if (targetThread) {
        targetThread.emoji = payload.emoji;
      }
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
  deleteThread,
  setScrollable,
  changeEmojiOfThread,
  updateAddSubThreadInfo,
  updateDeleteSubThreadInfo,
  setFirstScrollUsed,
  resetNextThreadId,
  addThreadListRequest,
  addThreadListSuccess,
  addThreadListFailure,
} = threadSlice.actions; // action 나눠서 export 하기

export default threadSlice.reducer;
