/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Channel } from '@/types';

interface FindChannelState {
  notJoinedChannelList: Channel[];
}

const initialState: FindChannelState = {
  notJoinedChannelList: [],
};

export interface FindNotJoinedChannelListRequestPayload {
  userId: number;
}

const findChannelSlice = createSlice({
  name: 'findChannel',
  initialState,
  reducers: {
    loadNotJoinedChannelsRequest(
      state,
      action: PayloadAction<FindNotJoinedChannelListRequestPayload>,
    ) {},
    loadNotJoinedChannelsSuccess(
      state,
      { payload }: PayloadAction<{ notJoinedChannelList: Channel[] }>,
    ) {
      state.notJoinedChannelList = payload.notJoinedChannelList;
      console.log(payload.notJoinedChannelList);
    },
    loadNotJoinedChannelsFailure(state, action: PayloadAction<{ err: Error }>) {
      // todo 에러처리
    },
  },
});

export const FINDCHANNEL = findChannelSlice.name;
export const {
  loadNotJoinedChannelsRequest,
  loadNotJoinedChannelsSuccess,
  loadNotJoinedChannelsFailure,
} = findChannelSlice.actions;
export default findChannelSlice.reducer;
