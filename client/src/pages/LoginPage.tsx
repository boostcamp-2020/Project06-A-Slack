import React from 'react';
import { Redirect } from 'react-router-dom';
import { LoginBox } from '@/components';
import { useAuthState } from '@/hooks';

const LoginPage: React.FC = () => {
  const { accessToken } = useAuthState();
  return <>{accessToken ? <Redirect to="/" /> : <LoginBox />}</>;
};

export default LoginPage;
