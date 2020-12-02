import API from '@/api';

export const subThreadService = {
  getSubThreadList({ parentId }: { parentId: number }) {
    return API.get(`/api/threads/${parentId}`);
  },
};
