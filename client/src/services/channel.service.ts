import API from '@/api';

export const channelService = {
  getChannels() {
    return API.get('/api/channels');
  },
  getChannel({ channelId }: { channelId: number }) {
    return API.get(`/api/channels/${channelId}`);
  },
};
