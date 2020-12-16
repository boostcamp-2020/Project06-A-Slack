/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JoinedUser, Channel, User, ChannelInfo } from '@/types';

interface ChannelState {
  myChannelList: Channel[];
  current: Channel | null;
  users: JoinedUser[];
  reloadMyChannelList: boolean;
}

const initialState: ChannelState = {
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
    resetChannelState() {
      return initialState;
    },
    loadMyChannelsRequest(state, action: PayloadAction<{ userId: number }>) {},
    loadMyChannelsSuccess(state, action: PayloadAction<{ myChannelList: Channel[] }>) {
      state.myChannelList = action.payload.myChannelList;
    },
    loadMyChannelsFailure(state, action) {
      // todo 에러처리
    },
    loadChannelRequest(state, action: PayloadAction<{ channelId: number; userId: number }>) {},
    loadChannelSuccess(state, action: PayloadAction<{ channel: Channel; users: JoinedUser[] }>) {
      state.current = action.payload.channel;
      state.users = action.payload.users;
    },
    loadChannelFailure(state, action) {
      // todo 에러처리
    },
    createChannelRequest(state, action: PayloadAction<{ channelInfo: ChannelInfo; user: User }>) {},
    createChannelSuccess(state, action: PayloadAction<{ channel: Channel }>) {
      const { channel } = action.payload;
      state.myChannelList.push(channel);
    },
    createChannelFailure(state, action: PayloadAction<{ err: Error }>) {
      // todo 에러처리
    },
    joinChannelRequset(state, action: PayloadAction<joinChannelRequsetPayload>) {},
    joinChannelSuccess(state, action: PayloadAction<{ users: JoinedUser[] }>) {
      state.users = action.payload.users;
    },
    joinChannelFailure(state, action) {
      // todo 에러처리
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
      state.myChannelList = state.myChannelList.map((chan) => {
        if (chan.id === state.current?.id) {
          return chan;
        }
        if (chan.id === channel.id) {
          return { ...chan, ...channel };
        }
        return chan;
      });
    },
    updateChannelTopic(state, { payload }: PayloadAction<{ channel: Channel }>) {
      const { channel } = payload;
      state.myChannelList = state.myChannelList.map((chan) => {
        if (chan.id === channel.id) {
          return { ...chan, topic: channel.topic };
        }
        return chan;
      });
      if (state.current?.id === channel.id) {
        state.current = channel;
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
    replaceUserAfterUpdateUserProfile(
      state,
      { payload }: PayloadAction<{ changedJoinedUserInfo: JoinedUser }>,
    ) {
      const { changedJoinedUserInfo } = payload;
      state.users = state.users.map((u) => {
        if (u.userId === changedJoinedUserInfo.userId) {
          return {
            ...u,
            displayName: changedJoinedUserInfo.displayName,
            image: changedJoinedUserInfo.image,
          };
        }
        return u;
      });
    },
  },
});

export const CHANNEL = channelSlice.name;
export const {
  resetChannelState,
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
  unsetUnreadFlag,
  updateChannelUnread,
  updateChannelTopic,
  updateChannelUsers,
  setReloadMyChannelListFlag,
  replaceUserAfterUpdateUserProfile,
} = channelSlice.actions;
export default channelSlice.reducer;
