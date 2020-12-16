import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginBox, LogoBox } from '@/components';
import { useAuthState } from '@/hooks';
import { loginSuccess } from '@/store/modules/auth.slice';
import { authService } from '@/services';
import qs from 'qs';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();

  const handleGoogleOAuthSuccess = async (token: any) => {
    const { data, status } = await authService.signupWithGoogleOAuth({
      accessToken: token,
    });
    const { accessToken, refreshToken, user } = data;
    if (status === 200) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', user.id);
      dispatch(
        loginSuccess({ accessToken, refreshToken, userId: user.id ? Number(user.id) : null }),
      );
    }
  };

  const { accessToken } = useAuthState();

  if (accessToken) {
    return <Redirect to="/" />;
  }

  const { search } = useLocation();
  const [, queryString] = search.split('?');
  const { accessToken: googleAccessToken } = qs.parse(queryString);

  if (googleAccessToken) {
    handleGoogleOAuthSuccess(googleAccessToken);
  }

  return (
    <>
      <LogoBox />
      <LoginBox />
    </>
  );
};

export default LoginPage;
