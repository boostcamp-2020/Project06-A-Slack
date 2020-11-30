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
  topic: string;
}

interface ChannelState {
  channelList: Channel[];
  joinChannelList: Channel[];
  current: Channel | null;
  channelListVisible: boolean;
  users: ChannelUsers[];
  detailVisible: boolean;
  channelId: number | null;
  topic: string;
  topicVisible: boolean;
  addChannelVisible: boolean;
}

const initialState: ChannelState = {
  channelList: [],
  joinChannelList: [],
  current: null,
  channelListVisible: true,
  users: [],
  detailVisible: false,
  channelId: null,
  topic: 'Add a topic',
  topicVisible: false,
  addChannelVisible: false,
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
    loadJoinChannelsRequest(state, action) {},
    loadJoinChannelsSuccess(state, action) {
      state.joinChannelList = action.payload.joinChannelList;
    },
    loadJoinChannelsFailure(state, action) {
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
    makeChannelRequest(state, action) {},
    makeChannelSuccess(state, action) {
      // state.channelList.push(action.)
    },
    makeChannelFailure(state, action) {},
    setCurrent(state, action) {
      state.current = state.joinChannelList[action.payload];
    },
    openChannelList(state) {
      state.channelListVisible = !state.channelListVisible;
    },
    openDetail(state) {
      state.detailVisible = !state.detailVisible;
    },
    openTopicModal(state) {
      state.topicVisible = !state.topicVisible;
    },
    openAddChannelModal(state) {
      state.addChannelVisible = !state.addChannelVisible;
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
  loadJoinChannelsRequest,
  loadJoinChannelsSuccess,
  loadJoinChannelsFailure,
  loadChannelRequest,
  loadChannelSuccess,
  loadChannelFailure,
  makeChannelRequest,
  makeChannelSuccess,
  makeChannelFailure,
  setCurrent,
  openChannelList,
  openDetail,
  openTopicModal,
  openAddChannelModal,
  changeTopic,
} = channelSlice.actions;
export default channelSlice.reducer;
