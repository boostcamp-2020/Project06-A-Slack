import API from '@/api';
import { ChannelInfo } from '@/types';

export const channelService = {
  getChannels() {
    return API.get('/api/channels');
  },
  getJoinChannels({ userId }: { userId: number }) {
    return API.get(`/api/users/${userId}/channels`);
  },
  getChannel({ channelId }: { channelId: number }) {
    return API.get(`/api/channels/${channelId}`);
  },
  createChannel({ ownerId, name, channelType, isPublic, description }: ChannelInfo) {
    return API.post('/api/channels', { ownerId, name, channelType, isPublic, description });
  },
  joinChannel({ userId, channelId }: { userId: number; channelId: number }) {
    return API.post(`/api/channels/${channelId}/invite`, { userId });
  },
  modifyLastChannel({
    lastChannelId,
    userId,
  }: {
    lastChannelId: number | null | undefined;
    userId: number | null | undefined;
  }) {
    return API.post(`/api/users/${userId}/last-channel`, { lastChannelId });
  },
};
