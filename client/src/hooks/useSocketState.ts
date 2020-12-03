import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/modules';

const selectSocket = createSelector(
  (state: RootState) => state.socket,
  (socket) => socket,
);
const useSocketState = () => {
  return useSelector(selectSocket);
};

export { useSocketState };
