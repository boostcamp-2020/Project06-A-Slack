import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/modules';

const selectRedirectState = createSelector(
  (state: RootState) => state.redirect,
  (redirect) => redirect,
);
const useRedirectState = () => {
  return useSelector(selectRedirectState);
};

export { useRedirectState };
