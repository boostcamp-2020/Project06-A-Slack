import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/modules';

const selectUserState = (state: RootState) => state.auth.user;
const selectUser = createSelector([selectUserState], (user) => user);

export const useUser = () => {
  return useSelector(selectUser);
};
