import API from '@/api';
import { Service } from '@/types';

interface LoginParam {
  email: string;
  pw: string;
}

export const authService: Service = {
  login({ email, pw }: LoginParam) {
    return API.post('/api/auth/login', { email, pw });
  },
  logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    return API.post('/api/auth/logout', { refreshToken });
  },
  verifyEmail({ email }: { email: string }) {
    return API.post('/api/auth/email/verify', { email });
  },
};
