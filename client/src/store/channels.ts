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
  channelList: Array<Channel>;
  show: string;
}

const initialState: ChannelState = {
  channelList: [],
  show: '',
};

const channelsSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    loadChannelsRequest(state) {
      // eslint-disable-next-line no-param-reassign
      state.show = 'axios 요청을 보냄';
    },
    loadChannelsSuccess(state, action) {
      console.log(state, action.payload);
      action.payload.channelList.map((channel: any) => console.log(channel));
      const channelList = action.payload.channelList.map((channel: Channel) => ({
        id: channel.id,
        ownerId: channel.ownerId,
        name: channel.name,
        channelType: channel.channelType,
        isPublic: channel.isPublic,
        memberCount: channel.memberCount,
        description: channel.description,
      }));
      // eslint-disable-next-line no-param-reassign
      state.channelList = channelList;
      // eslint-disable-next-line no-param-reassign
      state.show = '채널 목록';
    },
    loadChannelsFalse(state, action) {
      console.log(state, action);
      // eslint-disable-next-line no-param-reassign
      state.show = action.payload;
    },
  },
});

export const {
  loadChannelsRequest,
  loadChannelsSuccess,
  loadChannelsFalse,
} = channelsSlice.actions;
export default channelsSlice.reducer;
