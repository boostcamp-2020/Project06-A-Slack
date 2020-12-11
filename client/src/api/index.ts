import axios from 'axios';
import { TOKEN_TYPE } from '@/utils/constants';
import { verifyJWT } from '@/utils/utils';

const instance = axios.create({ timeout: 9000 });

instance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        await verifyJWT(accessToken, TOKEN_TYPE.ACCESS);
        return {
          ...config,
          headers: { ...config.headers, Authorization: `Bearer ${accessToken}` },
        };
      } catch (err) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          try {
            const { data, status } = await axios.post('/api/auth/token/refresh', {
              refreshToken,
            });
            if (status === 200) {
              localStorage.setItem('accessToken', data.accessToken);
              return {
                ...config,
                headers: { ...config.headers, Authorization: `Bearer ${data.accessToken}` },
              };
            }
          } catch (error) {
            if (error?.response?.status === 401) {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('userId');
              window.location.href = '/login';
            }
          }
        }
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

instance.interceptors.response.use(
  (res) => {
    if (res.status >= 400) {
      console.error('api 요청 실패', res);
    }
    return res;
  },
  (err) => {
    if (axios.isCancel(err)) {
      console.log('요청 취소', err);
    } else {
      if (err.response.status === 401) {
        window.location.href = '/login';
      }
      console.error('api 에러', err);
    }
    return Promise.reject(err);
  },
);

export default instance;
