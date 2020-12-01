/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JoinUser, Channel } from '@/types';

interface ChannelState {
  channelList: Channel[];
  joinChannelList: Channel[];
  current: Channel | null;
  channelListVisible: boolean;
  users: JoinUser[];
  detailVisible: boolean;
  channelId: number | null;
  topic: string;
  topicVisible: boolean;
  showUsersVisible: boolean;
  addChannelVisible: boolean;
  addUserVisible: boolean;
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
  showUsersVisible: false,
  addChannelVisible: false,
  addUserVisible: false,
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
    openShowUsers(state) {
      state.showUsersVisible = !state.showUsersVisible;
    },
    openAddUser(state) {
      state.addUserVisible = !state.addUserVisible;
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
  openChannelList,
  openDetail,
  openTopicModal,
  openAddChannelModal,
  changeTopic,
  openShowUsers,
  openAddUser,
} = channelSlice.actions;
export default channelSlice.reducer;
