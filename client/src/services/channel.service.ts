import API from '@/api';
import { ChannelInfo, Service, User } from '@/types';

export const channelService: Service = {
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
  joinChannel({ users, channelId }: { users: User[]; channelId: number }) {
    return API.post(`/api/channels/${channelId}/invite`, { users });
  },
  modifyChannelTopic({ channelId, topic }: { channelId: number; topic: string }) {
    return API.post(`/api/channels/${channelId}/topic`, { topic });
  },
  modifyLastChannel({ lastChannelId, userId }: { lastChannelId: number; userId: number }) {
    return API.post(`/api/users/${userId}/last-channel`, { lastChannelId });
  },
};
