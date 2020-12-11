import { useAuthState } from '@/hooks';
import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(InnerComponent: FC) {
  return function WrapperComponent(props: any) {
    const { accessToken } = useAuthState();

    if (accessToken) {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <InnerComponent {...props} />;
    }

    return <Redirect to="/login" />;
  };
}
