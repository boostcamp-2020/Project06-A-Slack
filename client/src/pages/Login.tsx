import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { LoginBox } from '@/components';
import { useAuth } from '@/hooks';

const Login = () => {
  const { accessToken } = useAuth();
  return (
    <>
      {accessToken ? (
        <Redirect to="/" />
      ) : (
        <>
          <Link to="/">Home</Link>
          <LoginBox />
        </>
      )}
    </>
  );
};

export default Login;
