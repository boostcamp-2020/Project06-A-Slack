import API from '@/api';
import { getThreadRequestPayload, createThreadRequestPayload } from '@/store/modules/thread';

export const threadService = {
  getThreadList({ channelId }: getThreadRequestPayload) {
    return API.get(`/api/threads/channels/${channelId}`);
  },
  createThread({ content, userId, channelId, parentId }: createThreadRequestPayload) {
    return API.post('/api/threads', { content, userId, channelId, parentId });
  },
};
