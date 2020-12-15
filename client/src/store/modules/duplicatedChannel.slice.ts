/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DuplicatedChannelState {
  loading: boolean;
  isDuplicated: boolean;
  err: Error | null;
}

const initialState: DuplicatedChannelState = {
  loading: false,
  isDuplicated: false,
  err: null,
};

const duplicatedChannelSlice = createSlice({
  name: 'duplicatedChannel',
  initialState,
  reducers: {
    checkDuplicateRequest(state, { payload }: PayloadAction<{ channelName: string }>) {
      return { ...initialState, loading: true };
    },
    checkDuplicateSuccess(state, { payload }: PayloadAction<{ isDuplicated: boolean }>) {
      state.loading = false;
      state.isDuplicated = payload.isDuplicated;
    },
    checkDuplicateFailure(state, { payload }: PayloadAction<{ err: Error }>) {
      state.loading = false;
      state.err = payload.err;
    },
  },
});

export const DUPLICATED_CHANNEL = duplicatedChannelSlice.name;
export const {
  checkDuplicateRequest,
  checkDuplicateSuccess,
  checkDuplicateFailure,
} = duplicatedChannelSlice.actions;
export default duplicatedChannelSlice.reducer;
