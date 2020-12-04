import React from 'react';
import { EmailBox, CodeVerifyBox } from '@/components';
import { useSignupState } from '@/hooks';

const EmailVerifyPage: React.FC = () => {
  const {
    verify: { verifyCode },
  } = useSignupState();
  return <>{verifyCode ? <CodeVerifyBox /> : <EmailBox />}</>;
};

export default EmailVerifyPage;
