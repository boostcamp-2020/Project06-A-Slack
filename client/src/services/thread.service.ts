import API from '@/api';
import { getThreadRequestPayload } from '@/store/modules/thread';

export const threadService = {
  getThreadList({ channelId }: getThreadRequestPayload) {
    return API.get(`/api/threads/channels/${channelId}`);
  },
};
