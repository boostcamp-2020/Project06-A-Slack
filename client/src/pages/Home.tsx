import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AUTH_ACTIONS } from '@/store/modules/auth';
import { ChannelListBox } from '@/components';
import { useAuth } from '@/hooks';

const Home = () => {
  const dispatch = useDispatch();

  const { accessToken } = useAuth();

  const handleLogout = () => {
    dispatch(AUTH_ACTIONS.logoutRequest());
  };

  return (
    <div>
      <p>Home page</p>
      {accessToken ? (
        <>
          <ChannelListBox />
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <Link to="/login">
          <button type="button">Login Page</button>
        </Link>
      )}
    </div>
  );
};

export default Home;
