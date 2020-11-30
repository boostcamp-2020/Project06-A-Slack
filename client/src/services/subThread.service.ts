import API from '@/api';
import { getSubThreadRequestPayload } from '@/store/modules/subThread';

export const subThreadService = {
  getSubThreadList({ parentId }: getSubThreadRequestPayload) {
    return API.get(`/api/threads/${parentId}`);
  },
};
