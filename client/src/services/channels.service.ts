import API from '@/api';

export const channelsService = {
  getChannels() {
    return API.get('/api/channels');
  },
};
