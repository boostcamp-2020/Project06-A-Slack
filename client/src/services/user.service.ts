import API from '@/api';

export const userService = {
  getUser({ id }: { id: number }): any {
    return API.get(`/api/users/${id}`);
  },
  editUser({ id }: { id: number; displayName: string; phoneNumber: string }): any {
    return API.post(`/api/users/${id}`);
  },
};
