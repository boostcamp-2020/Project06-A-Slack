import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuthState } from '@/hooks';

const HomePage: React.FC = () => {
  const { accessToken } = useAuthState();

  return <>{accessToken ? <Redirect to="/client/1" /> : <Redirect to="/login" />}</>;
};

export default HomePage;
