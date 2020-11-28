/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChannelUsers } from '@/types/channelUsers';

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
  current: Channel | null;
  channelListVisible: boolean;
  users: ChannelUsers[];
  detailVisible: boolean;
  channelId: number | null;
}

const initialState: ChannelState = {
  channelList: [],
  current: null,
  channelListVisible: true,
  users: [],
  detailVisible: false,
  channelId: null,
};

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    loadChannelsRequest() {},
    loadChannelsSuccess(state, action) {
      state.channelList = action.payload.channelList;
    },
    loadChannelsFailure(state, action) {
      // todo 에러처리
    },
    loadChannelRequest(state, action) {
      state.channelId = action.payload;
    },
    loadChannelSuccess(state, action) {
      state.users = action.payload.users;
    },
    loadChannelFailure(state, action) {
      // tdoo 에러처리
    },
    setCurrent(state, action) {
      state.current = state.channelList[action.payload];
    },
    openChannelList(state) {
      state.channelListVisible = !state.channelListVisible;
    },
    openDetail(state) {
      state.detailVisible = !state.detailVisible;
    },
  },
});

export const CHANNEL = channelSlice.name;
export const {
  loadChannelsRequest,
  loadChannelsSuccess,
  loadChannelsFailure,
  loadChannelRequest,
  loadChannelSuccess,
  loadChannelFailure,
  setCurrent,
  openChannelList,
  openDetail,
} = channelSlice.actions;
export default channelSlice.reducer;
