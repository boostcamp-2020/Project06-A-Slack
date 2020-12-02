import API from '@/api';

export const userService = {
  getUser({ id }: { id: number }): any {
    return API.get(`/api/users/${id}`);
  },
  editUser({ id, formData }: { id: number; formData: FormData }): any {
    return API.post(`/api/users/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
