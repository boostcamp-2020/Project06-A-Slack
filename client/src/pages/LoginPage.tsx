import React from 'react';
import { Redirect } from 'react-router-dom';
import { LoginBox, LogoBox } from '@/components';
import { useAuthState } from '@/hooks';

const LoginPage: React.FC = () => {
  const { accessToken } = useAuthState();

  if (accessToken) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <LogoBox />
      <LoginBox />
    </>
  );
};

export default LoginPage;
