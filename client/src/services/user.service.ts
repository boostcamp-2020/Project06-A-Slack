import API from '@/api';
import { Service } from '@/types';

export const userService: Service = {
  getUsers() {
    return API.get('/api/users');
  },
  getUser({ id }: { id: number }) {
    return API.get(`/api/users/${id}`);
  },
  editUser({ id, formData }: { id: number; formData: FormData }) {
    return API.post(`/api/users/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  searchUsers({
    displayName,
    channelId,
    isDM,
  }: {
    displayName: string;
    channelId: number;
    isDM: boolean;
  }) {
    return API.post('/api/users/search', { displayName, channelId, isDM });
  },
  getNotJoinedChannels({ userId }: { userId: number }) {
    return API.get(`/api/users/${userId}/channels/unsubscribed`);
  },
};
