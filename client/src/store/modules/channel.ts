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
  showChannelList: boolean;
  users: ChannelUsers[] | null;
  showDetail: boolean;
}

const initialState: ChannelState = {
  channelList: [],
  current: null,
  showChannelList: true,
  users: null,
  showDetail: false,
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
    loadChannelRequest(state, action) {},
    loadChannelSuccess(state, action) {
      state.users = action.payload.users;
    },
    loadChannelFailure(state, action) {},
    onChangeCurrent(state, action) {
      state.current = state.channelList[action.payload];
    },
    onChangeShowChannelList(state) {
      state.showChannelList = !state.showChannelList;
    },
    onChangeShowDetail(state) {
      state.showDetail = !state.showDetail;
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
  onChangeCurrent,
  onChangeShowChannelList,
  onChangeShowDetail,
} = channelSlice.actions;
export default channelSlice.reducer;
