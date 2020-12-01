import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '@/hooks';

const HomePage: React.FC = () => {
  const { accessToken } = useAuth();

  return <>{accessToken ? <Redirect to="/workspace" /> : <Redirect to="/login" />}</>;
};

export default HomePage;
