/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

interface Props {
  path: string | string[];
  exact?: boolean;
  component: FC;
  fallback?: FC;
  isAllowed: boolean;
}

export const RestrictRoute = ({ component: Component, fallback: Fallback, isAllowed }: Props) => {
  if (isAllowed) {
    return <Component />;
  }

  if (Fallback) {
    return <Fallback />;
  }

  return <Redirect to="/login" />;
};
