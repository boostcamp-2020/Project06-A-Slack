/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Thread } from '@/types';
import { RootState } from '@/store/modules';

interface SubThreadList {
  subThreadList: Thread[] | null;
}

export interface getSubThreadRequestPayload {
  parentId: number;
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
  subCount: 0,
  subThreadId1: 0,
  subThreadId2: 0,
  subThreadId3: 0,
};

const subThreadListState: SubThreadList = {
  subThreadList: [threadState],
};

// 리듀서
const subThreadSlice = createSlice({
  name: 'subThread',
  initialState: subThreadListState,
  reducers: {
    getSubThreadRequest(state, action: PayloadAction<getSubThreadRequestPayload>) {},
    getSubThreadSuccess(state, action: PayloadAction<SubThreadList>) {
      state.subThreadList = action.payload.subThreadList;
    },
    getSubThreadFailure(state, action) {},
  },
});

export const SUBTHREAD = subThreadSlice.name;
export const {
  getSubThreadRequest,
  getSubThreadSuccess,
  getSubThreadFailure,
} = subThreadSlice.actions; // action 나눠서 export 하기

export default subThreadSlice.reducer;
