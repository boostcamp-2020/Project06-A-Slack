import axios from 'axios';
import { ERROR_MESSAGE } from '@/utils/constants';

const instance = axios.create({ timeout: 8000 });

if (process.env.MODE !== 'dev') {
  instance.defaults.baseURL = process.env.BASE_URL;
}

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    return { ...config, headers: { ...config.headers, Authorization: `Bearer ${accessToken}` } };
  },
  (err) => {
    return Promise.reject(err);
  },
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalReq = err.config;
    if (err.response.status === 401 && err.response.data?.message === ERROR_MESSAGE.INVALID_TOKEN) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const { data, status } = await axios.post('/api/auth/token/refresh', { refreshToken });
          if (status === 200) {
            const { accessToken } = data;
            localStorage.setItem('accessToken', accessToken);
            return instance.request(originalReq);
          }
        } catch (error) {
          if (error?.response?.status === 401) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
          }
        }
      }
    }
    return Promise.reject(err);
  },
);

export default instance;
