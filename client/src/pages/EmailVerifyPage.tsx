import React from 'react';
import { Link } from 'react-router-dom';
import { EmailBox, CodeVerifyBox } from '@/components';
import { useSignupState } from '@/hooks';

const EmailVerifyPage = () => {
  const {
    verify: { verifyCode },
  } = useSignupState();
  return (
    <div>
      <Link to="/">Home</Link>
      {verifyCode ? <CodeVerifyBox /> : <EmailBox />}
    </div>
  );
};

export default EmailVerifyPage;
