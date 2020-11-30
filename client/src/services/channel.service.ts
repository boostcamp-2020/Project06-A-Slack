import API from '@/api';

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
};
