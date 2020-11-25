import axios from 'axios';

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

export default instance;
