import API from '@/api';

interface Args {
  channelId: number;
}

export const channelService = {
  getChannels() {
    return API.get('/api/channels');
  },
  getChannel({ channelId }: Args) {
    return API.get(`/api/channels/${channelId}`);
  },
};
