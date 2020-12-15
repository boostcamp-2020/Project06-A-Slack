import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/modules';

const selectChannelState = (state: RootState) => state.channel;
const selectChannel = createSelector(selectChannelState, (channels) => channels);

const selectJoinChannelListState = (state: RootState) => state.channel.myChannelList;
const selectJoinChannelList = (idx: number) =>
  createSelector(selectJoinChannelListState, (joinChannelList) => joinChannelList[idx]);

export const useChannelState = () => {
  return useSelector(selectChannel);
};

export const useJoinChannelListState = (idx: number) => {
  return useSelector(selectJoinChannelList(idx));
};
