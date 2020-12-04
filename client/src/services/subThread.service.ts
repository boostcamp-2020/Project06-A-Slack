import API from '@/api';
import { Service } from '@/types';

export const subThreadService: Service = {
  getSubThreadList({ parentId }: { parentId: number }) {
    return API.get(`/api/threads/${parentId}`);
  },
};
