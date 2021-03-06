import API from '@/api';
import { Service } from '@/types';
import axios from 'axios';

interface LoginParam {
  email: string;
  pw: string;
}

interface SignupParam {
  email: string;
  pw: string;
  displayName: string;
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
  signup({ email, pw, displayName }: SignupParam) {
    return API.post('/api/auth/signup', { email, pw, displayName });
  },
  checkExistEmail({ email }: { email: string }) {
    return API.post('/api/auth/email/check', { email });
  },
  signupWithGoogleOAuth({ accessToken }: { accessToken: string }) {
    return axios.post('/api/oauth/google/signup', { accessToken });
  },
};
