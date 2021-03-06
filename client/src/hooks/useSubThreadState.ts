import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/modules';

export const selectSubThread = createSelector(
  (state: RootState) => state.subThread,
  (st) => st,
);

const useSubThreadState = () => {
  return useSelector(selectSubThread);
};

export { useSubThreadState };
