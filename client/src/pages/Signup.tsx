import React from 'react';
import { Link } from 'react-router-dom';
import { SignupVerifyBox } from '@/components';

const SignUp = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <SignupVerifyBox />
    </div>
  );
};

export default SignUp;
