import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useSignupState } from '@/hooks';
import { removeVerifyEmail } from '@/store/modules/signup.slice';

const SignupPage: React.FC = () => {
  const dispatch = useDispatch();
  const { email } = useSignupState();

  useEffect(() => {
    return () => {
      dispatch(removeVerifyEmail());
    };
  }, []);

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
