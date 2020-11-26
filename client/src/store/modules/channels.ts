/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Channel {
  channelType: string;
  description: string;
  id: number;
  isPublic: number;
  memberCount: number;
  name: string;
  ownerId: number;
}

interface ChannelState {
  channelList: Channel[];
  current: number | undefined;
  showList: boolean;
}

const initialState: ChannelState = {
  channelList: [],
  current: undefined,
  showList: true,
};

const channelsSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    loadChannelsRequest(state) {},
    loadChannelsSuccess(state, action) {
      state.channelList = action.payload.channelList;
    },
    loadChannelsFailure(state, action) {
      // todo 에러처리
    },
    onChangeCurrent(state, action) {
      state.current = action.payload;
    },
    onChangeShowList(state) {
      state.showList = !state.showList;
    },
  },
});

export const CHANNELS = channelsSlice.name;
export const {
  loadChannelsRequest,
  loadChannelsSuccess,
  loadChannelsFailure,
  onChangeCurrent,
  onChangeShowList,
} = channelsSlice.actions;
export default channelsSlice.reducer;
