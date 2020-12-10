import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/modules';

const selectFindChannelState = createSelector(
  (state: RootState) => state.findChannel,
  (findChannel) => findChannel,
);

const useFindChannelState = () => {
  return useSelector(selectFindChannelState);
};

export { useFindChannelState };
