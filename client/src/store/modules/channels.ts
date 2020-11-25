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
  show: string;
  current: number | undefined;
  showList: boolean;
}

const initialState: ChannelState = {
  channelList: [],
  show: '',
  current: undefined,
  showList: true,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    loadChannelsRequest(state) {
      state.show = 'axios 요청을 보냄';
    },
    loadChannelsSuccess(state, action) {
      state.channelList = action.payload.channelList;
      state.show = '채널 목록';
    },
    loadChannelsFalse(state, action) {
      state.show = action.payload;
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
  loadChannelsFalse,
  onChangeCurrent,
  onChangeShowList,
} = channelsSlice.actions;
export default channelsSlice.reducer;
