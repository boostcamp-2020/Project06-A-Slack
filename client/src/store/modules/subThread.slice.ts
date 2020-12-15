/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Thread, initialThread, EmojiOfThread } from '@/types';

interface SubThreadBox {
  parentThread: Thread;
  subThreadList: Thread[] | null;
}

export interface GetSubThreadRequestPayload {
  parentId: number;
}

const subThreadListState: SubThreadBox = {
  parentThread: initialThread,
  subThreadList: null,
};

// 리듀서
const subThreadSlice = createSlice({
  name: 'subThread',
  initialState: subThreadListState,
  reducers: {
    resetSubThreadState() {
      return subThreadListState;
    },
    getSubThreadRequest(state, action: PayloadAction<GetSubThreadRequestPayload>) {},
    getSubThreadSuccess(state, action: PayloadAction<SubThreadBox>) {
      state.parentThread = action.payload.parentThread;
      state.subThreadList = action.payload.subThreadList;
    },
    getSubThreadFailure(state, action) {},
    addSubThread(state, { payload }: PayloadAction<{ thread: Thread }>) {
      const { thread } = payload;
      if (state.parentThread.id === thread.parentId) {
        state.parentThread.subCount += 1;
        if (state.subThreadList?.length) {
          state.subThreadList.push(thread);
          return;
        }
        state.subThreadList = [thread];
      }
    },
    deleteSubThread(state, { payload }: PayloadAction<{ thread: Thread }>) {
      const { thread } = payload;
      if (state.parentThread.id === thread.parentId) {
        state.parentThread.subCount -= 1;
        const targetThread = state.subThreadList?.find((st) => st.id === thread.id);
        if (targetThread) {
          targetThread.isDeleted = 1;
        }
      }
    },
    deleteSubParentThread(state, { payload }: PayloadAction<{ threadId: number }>) {
      const { threadId } = payload;
      if (state.parentThread.id === threadId) {
        state.parentThread.isDeleted = 1;
      }
    },
    changeEmojiOfSubThread(
      state,
      { payload }: PayloadAction<{ emoji: EmojiOfThread[]; threadId: number }>,
    ) {
      if (state.parentThread.id === payload.threadId) {
        state.parentThread.emoji = payload.emoji;
        return;
      }
      const targetThread = state.subThreadList?.find(
        (thread) => Number(thread.id) === Number(payload.threadId),
      );
      if (targetThread) {
        targetThread.emoji = payload.emoji;
      }
    },
  },
});

export const SUBTHREAD = subThreadSlice.name;
export const {
  resetSubThreadState,
  getSubThreadRequest,
  getSubThreadSuccess,
  getSubThreadFailure,
  addSubThread,
  deleteSubThread,
  deleteSubParentThread,
  changeEmojiOfSubThread,
} = subThreadSlice.actions; // action 나눠서 export 하기

export default subThreadSlice.reducer;
