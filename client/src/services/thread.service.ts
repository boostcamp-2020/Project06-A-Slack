import API from '@/api';
import { getThreadRequestPayload, createThreadRequestPayload } from '@/store/modules/thread.slice';
import { Service } from '@/types';
import qs from 'qs';

export const threadService: Service = {
  getThreadList({ channelId, nextThreadId }: getThreadRequestPayload) {
    return API.get(`/api/threads/channels/${channelId}?${qs.stringify({ nextThreadId })}`);
  },
  createThread({ content, userId, channelId, parentId }: createThreadRequestPayload) {
    return API.post('/api/threads', { content, userId, channelId, parentId });
  },
};
