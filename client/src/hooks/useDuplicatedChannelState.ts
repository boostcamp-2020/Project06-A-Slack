import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/modules';

const selectDuplicatedChannel = createSelector(
  (state: RootState) => state.duplicatedChannel,
  (duplicatedChannel) => duplicatedChannel,
);
const useDuplicatedChannelState = () => {
  return useSelector(selectDuplicatedChannel);
};

export { useDuplicatedChannelState };
