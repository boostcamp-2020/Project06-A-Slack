import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/modules';

export const selectThread = createSelector(
  (state: RootState) => state.thread,
  (t) => t,
);

const useThreadState = () => {
  return useSelector(selectThread);
};

export { useThreadState };
