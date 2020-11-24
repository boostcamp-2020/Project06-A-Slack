import axios from 'axios';

const instance = axios.create({ timeout: 8000 });

if (process.env.MODE !== 'dev') {
  instance.defaults.baseURL = process.env.BASE_URL;
}

export default instance;
