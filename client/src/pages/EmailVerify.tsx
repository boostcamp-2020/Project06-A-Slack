import React from 'react';
import { Link } from 'react-router-dom';
import { EmailBox } from '@/components';
import { useSignupState } from '@/hooks';

const EmailVerifyPage = () => {
  const {
    verify: { verifyCode },
  } = useSignupState();
  return (
    <div>
      <Link to="/">Home</Link>
      {verifyCode ? <div>인증 코드 입력 화면</div> : <EmailBox />}
    </div>
  );
};

export default EmailVerifyPage;
