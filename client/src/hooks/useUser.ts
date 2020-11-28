import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/modules';

const selectUser = createSelector(
  (state: RootState) => state.user,
  (user) => user,
);
const useUser = () => {
  return useSelector(selectUser);
};

export { useUser };
