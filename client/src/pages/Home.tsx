import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '@/store/modules/auth';
import { ChannelListBox, ThreadListBox } from '@/components';

const Home = () => {
  const dispatch = useDispatch();

  const { accessToken } = useAuth();

  const handleLogout = () => {
    dispatch(logoutRequest());
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
          <ThreadListBox />
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
