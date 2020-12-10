import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/modules';

export const selectEmoji = createSelector(
  (state: RootState) => state.emoji,
  (emoji) => emoji,
);

const useEmojiState = () => {
  return useSelector(selectEmoji);
};

export { useEmojiState };
