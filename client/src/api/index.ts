import axios from 'axios';
import { TOKEN_TYPE } from '@/utils/constants';
import { verifyJWT } from '@/utils/utils';
import { TokenExpiredError } from 'jsonwebtoken';

const instance = axios.create({ timeout: 8000 });

if (process.env.MODE !== 'dev') {
  instance.defaults.baseURL = process.env.BASE_URL;
}

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
        if (err instanceof TokenExpiredError) {
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
                window.location.href = '/login';
              }
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

export default instance;
