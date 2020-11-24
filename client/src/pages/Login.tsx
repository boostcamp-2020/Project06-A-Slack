import React from 'react';
import { Link } from 'react-router-dom';
import { LoginBox } from '@/components';

const Login = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <LoginBox />
    </div>
  );
};

export default Login;
