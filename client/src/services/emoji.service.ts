import API from '@/api';
import { Service } from '@/types';

export const emojiService: Service = {
  getEmojiList() {
    return API.get('/api/emojis');
  },
  // creatEemoji({ content, userId, channelId, parentId }: createEmojiRequestPayload) {
  //   return API.post('/api/emojis', { content, userId, channelId, parentId });
  // },
};
