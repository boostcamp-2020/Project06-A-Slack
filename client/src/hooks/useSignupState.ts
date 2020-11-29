import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/modules';

const selectSignupState = createSelector(
  (state: RootState) => state.signup,
  (signup) => signup,
);
const useSignupState = () => {
  return useSelector(selectSignupState);
};

export { useSignupState };
