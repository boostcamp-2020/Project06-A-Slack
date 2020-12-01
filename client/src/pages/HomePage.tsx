import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth, useChannel } from '@/hooks';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '@/store/modules/auth';
import {
  Header,
  LeftSideBar,
  ThreadListBox,
  DetailBox,
  AddTopicModal,
  CreateChannelModal,
  ShowUsersModal,
} from '@/components';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const HomePage = () => {
  const dispatch = useDispatch();

  const { topicVisible, addChannelVisible, showUsersVisible } = useChannel();
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
      {topicVisible && <AddTopicModal />}
      {addChannelVisible && <CreateChannelModal />}
      {showUsersVisible && <ShowUsersModal />}
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default HomePage;
