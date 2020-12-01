/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JoinUser, Channel } from '@/types';

interface ChannelState {
  channelList: Channel[];
  joinChannelList: Channel[];
  current: Channel | null;
  users: JoinUser[];
  channelId: number | null;
  topic: string;
}

const initialState: ChannelState = {
  channelList: [],
  joinChannelList: [],
  current: null,
  users: [],
  channelId: null,
  topic: 'Add a topic',
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
    loadMyChannelsRequest(state, action) {},
    loadMyChannelsSuccess(state, action) {
      state.joinChannelList = action.payload.joinChannelList;
    },
    loadMyChannelsFailure(state, action) {
      // todo 에러처리
    },
    loadChannelRequest(state, action) {
      state.channelId = action.payload;
    },
    loadChannelSuccess(state, action) {
      state.users = action.payload.users;
    },
    loadChannelFailure(state, action) {
      // todo 에러처리
    },
    createChannelRequest(state, action) {},
    createChannelSuccess(state, action) {
      state.channelList.push(action.payload.channel);
      state.joinChannelList.push(action.payload.channel);
      state.current = action.payload.channel;
      state.users = [action.payload.joinUser];
    },
    createChannelFailure(state, action) {
      // todo 에러처리
    },
    joinChannelRequset(state, action) {},
    joinChannelSuccess(state, action) {},
    joinChannelFailure(state, action) {
      // todo 에러처리
    },
    setCurrent(state, action) {
      state.current = state.joinChannelList[action.payload];
    },
    changeTopic(state, action) {
      state.topic = action.payload;
    },
  },
});

export const CHANNEL = channelSlice.name;
export const {
  loadChannelsRequest,
  loadChannelsSuccess,
  loadChannelsFailure,
  loadMyChannelsRequest,
  loadMyChannelsSuccess,
  loadMyChannelsFailure,
  loadChannelRequest,
  loadChannelSuccess,
  loadChannelFailure,
  createChannelRequest,
  createChannelSuccess,
  createChannelFailure,
  joinChannelRequset,
  joinChannelSuccess,
  joinChannelFailure,
  setCurrent,
  changeTopic,
} = channelSlice.actions;
export default channelSlice.reducer;
