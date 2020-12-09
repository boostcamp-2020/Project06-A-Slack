/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JoinedUser, Channel, User } from '@/types';

interface ChannelState {
  channelList: Channel[];
  myChannelList: Channel[];
  current: Channel | null;
  users: JoinedUser[];
  reloadMyChannelList: boolean;
}

const initialState: ChannelState = {
  channelList: [],
  myChannelList: [],
  current: null,
  users: [],
  reloadMyChannelList: false,
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
    loadChannelRequest(state, action: PayloadAction<{ channelId: number; userId: number }>) {},
    loadChannelSuccess(state, action) {
      state.current = action.payload.channel;
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
    unsetUnreadFlag(state, { payload }: PayloadAction<{ channelId: number }>) {
      const { channelId } = payload;
      if (state.current) {
        const target = state.myChannelList.find((c) => c.id === channelId);
        if (target) {
          target.unreadMessage = false;
        }
      }
    },
    updateChannelUnread(state, { payload }: PayloadAction<{ channel: Channel }>) {
      const { channel } = payload;
      const idx = state.myChannelList.findIndex((c) => c.id === channel.id);
      if (state.current) {
        if (idx !== -1 && state.myChannelList[idx].id !== state.current.id) {
          state.myChannelList[idx] = { ...state.myChannelList[idx], ...channel };
        }
      }
    },
    updateChannelTopic(state, { payload }: PayloadAction<{ channel: Channel }>) {
      const { channel } = payload;
      const idx = state.myChannelList.findIndex((c) => c.id === channel.id);
      if (idx !== -1) {
        state.myChannelList[idx] = { ...state.myChannelList[idx], topic: channel.topic };
        if (state.current?.id === channel.id) {
          state.current = channel;
        }
      }
    },
    updateChannelUsers(
      state,
      { payload }: PayloadAction<{ users: JoinedUser[]; channel: Channel }>,
    ) {
      const { users, channel } = payload;
      if (state.current?.id === channel.id) {
        state.users = users;
      }
      state.reloadMyChannelList = true;
    },
    setReloadMyChannelListFlag(
      state,
      { payload }: PayloadAction<{ reloadMyChannelList: boolean }>,
    ) {
      state.reloadMyChannelList = payload.reloadMyChannelList;
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
  unsetUnreadFlag,
  updateChannelUnread,
  updateChannelTopic,
  updateChannelUsers,
  setReloadMyChannelListFlag,
} = channelSlice.actions;
export default channelSlice.reducer;
