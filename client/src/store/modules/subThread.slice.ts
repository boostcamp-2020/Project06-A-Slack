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
    getSubThreadRequest(state, action: PayloadAction<GetSubThreadRequestPayload>) {},
    getSubThreadSuccess(state, action: PayloadAction<SubThreadBox>) {
      state.parentThread = action.payload.parentThread;
      state.subThreadList = action.payload.subThreadList;
    },
    getSubThreadFailure(state, action) {},
    addSubThread(state, action) {
      if (state.subThreadList?.length) {
        state.subThreadList.push(action.payload.thread);
      } else {
        state.subThreadList = [action.payload.thread];
      }
      state.parentThread.subCount += 1;
    },
    changeEmojiOfSubThread(
      state,
      { payload }: PayloadAction<{ emoji: EmojiOfThread[]; threadId: number }>,
    ) {
      if (state.parentThread.id === payload.threadId) {
        state.parentThread.emoji = payload.emoji;
      } else {
        const targetThread = state.subThreadList?.find(
          (thread) => Number(thread.id) === Number(payload.threadId),
        );
        if (targetThread) {
          targetThread.emoji = payload.emoji;
        }
      }
    },
  },
});

export const SUBTHREAD = subThreadSlice.name;
export const {
  getSubThreadRequest,
  getSubThreadSuccess,
  getSubThreadFailure,
  addSubThread,
  changeEmojiOfSubThread,
} = subThreadSlice.actions; // action 나눠서 export 하기

export default subThreadSlice.reducer;
