import API from '@/api';

interface EditUserParams {
  id: number;
  displayName: string;
  phoneNumber: string;
}

export const userService = {
  getUser({ id }: { id: number }): any {
    return API.get(`/api/users/${id}`);
  },
  editUser({ id, displayName, phoneNumber }: EditUserParams): any {
    return API.post(`/api/users/${id}`, { id, displayName, phoneNumber });
  },
};
