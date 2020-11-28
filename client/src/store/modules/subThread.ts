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

const subThreadListState: SubThreadList = {
  subThreadList: null,
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
