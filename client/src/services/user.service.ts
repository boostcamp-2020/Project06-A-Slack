import API from '@/api';

export const userService = {
  getUser({ no }: { no: number }) {
    const accessToken = localStorage.getItem('accessToken');
    return API.get(`/api/users/${no}`, { headers: { Authorization: `Bearer ${accessToken}` } });
  },
};
