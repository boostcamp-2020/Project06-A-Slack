import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/modules';

const selectAuthState = (state: RootState) => state.auth;
const selectAuth = createSelector(selectAuthState, (auth) => auth);

export const useAuth = () => {
  return useSelector(selectAuth);
};
