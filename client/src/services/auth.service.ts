import API from '@/api';

interface LoginParam {
  email: string;
  pw: string;
}

export const authService = {
  login({ email, pw }: LoginParam) {
    return API.post('/api/auth/login', { email, pw });
  },
  logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    return API.post('/api/auth/logout', { refreshToken });
  },
};
