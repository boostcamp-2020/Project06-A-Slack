import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import qs from 'qs';
import { loginSuccess } from '@/store/modules/auth.slice';
import { useDispatch } from 'react-redux';
import { useAuthState } from '@/hooks';

const HomePage: React.FC = () => {
  const authState = useAuthState();
  /* 로그인 성공 후 오는 경우 -> 일반 로그인은 acc가 있다 */
  if (authState.accessToken) {
    return <Redirect to="/client/1" />;
  }

  /* OAuth로 오는 경우 */
  const { search } = useLocation();
  const [, queryString] = search.split('?');
  const { accessToken, refreshToken, userId } = qs.parse(queryString);
  const dispatch = useDispatch();

  if (String(accessToken) && String(refreshToken) && String(userId)) {
    localStorage.setItem('accessToken', String(accessToken));
    localStorage.setItem('refreshToken', String(refreshToken));
    localStorage.setItem('userId', String(userId));
    dispatch(
      loginSuccess({
        accessToken: String(accessToken),
        refreshToken: String(refreshToken),
        userId: +String(userId),
      }),
    );
    return <Redirect to="/client/1" />;
  }

  /* 그 외에 로그인 안된 경우 */
  return <Redirect to="/login" />;
};

export default HomePage;
