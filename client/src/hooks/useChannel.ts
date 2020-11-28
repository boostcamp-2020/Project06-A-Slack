import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/modules';

const selectChannelState = (state: RootState) => state.channel;
const selectChannel = createSelector(selectChannelState, (channels) => channels);

const selectChannelListState = (state: RootState) => state.channel.channelList;
const selectChannelList = (idx: number) =>
  createSelector(selectChannelListState, (channelList) => channelList[idx]);

export const useChannel = () => {
  return useSelector(selectChannel);
};

export const useChannelList = (idx: number) => {
  return useSelector(selectChannelList(idx));
};
