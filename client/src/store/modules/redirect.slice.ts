/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/modules';

interface RedirectState {
  url: string | null;
}

const redirectState: RedirectState = {
  url: null,
};

const redirectSlice = createSlice({
  name: 'redirect',
  initialState: redirectState,
  reducers: {
    setRedirect(state, { payload }: PayloadAction<{ url: string | null }>) {
      state.url = payload.url;
    },
  },
});

const selectRedirectState = (state: RootState) => state.redirect;

export const selectRedirect = createSelector(selectRedirectState, (redirect) => redirect);
export const REDIRECT = redirectSlice.name;
export const { setRedirect } = redirectSlice.actions;

export default redirectSlice.reducer;
