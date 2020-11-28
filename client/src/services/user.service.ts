import API from '@/api';

export const userService = {
  getUser({ id }: { id: number }) {
    return API.get(`/api/users/${id}`);
  },
};
