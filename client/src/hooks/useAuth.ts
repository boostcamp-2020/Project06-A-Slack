import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/modules';

const selectAuth = createSelector(
  (state: RootState) => state.auth,
  (auth) => auth,
);
const useAuth = () => {
  return useSelector(selectAuth);
};

export { useAuth };
