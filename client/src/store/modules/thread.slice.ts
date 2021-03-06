/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmojiOfThread, JoinedUser, Thread, ThreadResponse } from '@/types';

interface ThreadState {
  threadList: Thread[] | null;
  canScrollToBottom: boolean;
  loading: boolean;
  nextThreadId: number | null;
  firstScrollUsed: boolean;
  prevTopThreadId: number | null;
  gotoPreviousTopItemPosition: boolean;
}

const threadListState: ThreadState = {
  threadList: null,
  canScrollToBottom: false,
  loading: false,
  nextThreadId: null,
  firstScrollUsed: false,
  prevTopThreadId: null,
  gotoPreviousTopItemPosition: false,
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
  canScrollToBottom: boolean;
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
    resetThreadState() {
      return threadListState;
    },
    getThreadRequest(state, action: PayloadAction<getThreadRequestPayload>) {
      state.prevTopThreadId = null;
      state.loading = true;
      state.nextThreadId = null;
      state.firstScrollUsed = false;
      state.threadList = null;
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
      state.gotoPreviousTopItemPosition = true;
    },
    addThreadListFailure(state) {
      state.loading = false;
    },
    createThreadRequest(state, action: PayloadAction<createThreadRequestPayload>) {},
    createThreadSuccess(state, action: PayloadAction<ThreadResponse>) {},
    createThreadFailure(state, action) {},
    addThread(state, { payload }: PayloadAction<{ thread: Thread }>) {
      const { thread } = payload;
      if (state.threadList?.length) {
        state.threadList.push(thread);
      } else {
        state.threadList = [thread];
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
    setScrollable(state, { payload }: PayloadAction<{ canScrollToBottom: boolean }>) {
      state.canScrollToBottom = payload.canScrollToBottom;
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
    replaceThreadsAfterUpdateUserProfile(
      state,
      { payload }: PayloadAction<{ changedJoinedUserInfo: JoinedUser }>,
    ) {
      const { changedJoinedUserInfo } = payload;
      if (state.threadList) {
        state.threadList = state.threadList.map((thread) => {
          if (thread.userId === changedJoinedUserInfo.userId) {
            return {
              ...thread,
              displayName: changedJoinedUserInfo.displayName,
              image: changedJoinedUserInfo.image,
            };
          }
          return thread;
        });
      }
    },
    setGotoPreviousTopItemPosition(
      state,
      { payload }: PayloadAction<{ gotoPreviousTopItemPosition: boolean }>,
    ) {
      state.gotoPreviousTopItemPosition = payload.gotoPreviousTopItemPosition;
    },
  },
});

export const THREAD = threadSlice.name;
export const {
  resetThreadState,
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
  replaceThreadsAfterUpdateUserProfile,
  setGotoPreviousTopItemPosition,
} = threadSlice.actions;

export default threadSlice.reducer;
