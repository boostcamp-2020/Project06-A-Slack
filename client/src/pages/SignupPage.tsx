import React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

interface LocationState {
  email: string;
}

const SignupPage: React.FC = () => {
  const location = useLocation<LocationState>();
  const { email } = location.state;

  return (
    <>
      {!email ? (
        <Redirect to="/" />
      ) : (
        <>
          <Link to="/">Home</Link>
          <h1>회원가입 페이지</h1>
        </>
      )}
    </>
  );
};

export default SignupPage;
