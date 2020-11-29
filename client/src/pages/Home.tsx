import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '@/hooks';
import { logoutRequest } from '@/store/modules/auth';
import { Header, ChannelListBox, ThreadListBox, DetailBox } from '@/components';

const Home = () => {
  const dispatch = useDispatch();

  const { accessToken } = useAuth();

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  return (
    <div>
      <Header />
      <p>Home page</p>
      {accessToken ? (
        <>
          <ChannelListBox />
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
          <ThreadListBox />
          <DetailBox />
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
