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
  matchUsers({
    displayName,
    channelId,
    first,
  }: {
    displayName: string;
    channelId: number;
    first: boolean;
  }) {
    return API.post('/api/users/match', { displayName, channelId, first });
  },
};
