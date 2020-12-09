/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JoinedUser, Channel, User } from '@/types';

interface ChannelState {
  channelList: Channel[];
  myChannelList: Channel[];
  current: Channel | null;
  users: JoinedUser[];
  channelId: number | null;
  isAddUsers: boolean;
}

const initialState: ChannelState = {
  channelList: [],
  myChannelList: [],
  current: null,
  users: [],
  channelId: null,
  isAddUsers: false,
};

export interface modifyLastChannelRequestPayload {
  lastChannelId: number;
  userId: number;
}

export interface modifyTopicChannelRequestPayload {
  channelId: number;
  topic: string;
}

export interface joinChannelRequsetPayload {
  users: User[];
  channelId: number;
}

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
      state.myChannelList = action.payload.joinChannelList;
    },
    loadMyChannelsFailure(state, action) {
      // todo 에러처리
    },
    loadChannelRequest(state, action) {
      state.channelId = action.payload.channelId;
    },
    loadChannelSuccess(state, action) {
      const [temp] = action.payload.channel;
      state.current = temp;
      state.users = action.payload.users;
    },
    loadChannelFailure(state, action) {
      // todo 에러처리
    },
    createChannelRequest(state, action) {},
    createChannelSuccess(state, action) {
      state.channelList.push(action.payload.channel);
      state.myChannelList.push(action.payload.channel);
      state.current = action.payload.channel;
      state.users = action.payload.joinedListUser;
    },
    createChannelFailure(state, action) {
      // todo 에러처리
    },
    joinChannelRequset(state, action: PayloadAction<joinChannelRequsetPayload>) {},
    joinChannelSuccess(state, action: PayloadAction<{ users: JoinedUser[] }>) {
      state.users = action.payload.users;
    },
    joinChannelFailure(state, action) {
      // todo 에러처리
    },
    setCurrent(state, action) {
      state.current = action.payload;
    },
    setUsers(state, action) {
      state.channelList.push(action.payload.channel);
      state.isAddUsers = true;
      if (state.current && state.current.id === action.payload.id) {
        state.users = action.payload.users;
      }
    },
    setIsAddUsers(state) {
      state.isAddUsers = false;
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
  setUsers,
  setIsAddUsers,
} = channelSlice.actions;
export default channelSlice.reducer;
