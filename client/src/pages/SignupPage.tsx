import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useSignupState } from '@/hooks';
import { removeVerifyEmail } from '@/store/modules/signup.slice';
import { SignupBox, LogoBox } from '@/components';

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
      {email ? (
        <Redirect to="/" />
      ) : (
        <>
          <LogoBox />
          <SignupBox />
        </>
      )}
    </>
  );
};

export default SignupPage;
