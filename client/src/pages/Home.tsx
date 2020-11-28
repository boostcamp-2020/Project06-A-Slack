import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '@/store/modules/auth';
import { Header, LeftSideBar, ThreadListBox, DetailBox } from '@/components';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Home = () => {
  const dispatch = useDispatch();

  const { accessToken } = useAuth();

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  return (
    <>
      <Header />
      <Container>
        {accessToken ? (
          <>
            <LeftSideBar />
            <ThreadListBox />
            <DetailBox />
          </>
        ) : (
          <Link to="/login">
            <button type="button">Login Page</button>
          </Link>
        )}
      </Container>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default Home;
