import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth, useChannel } from '@/hooks';
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

const HomePage: React.FC = () => {
  const { topicVisible, addChannelVisible, showUsersVisible } = useChannel();
  const { accessToken } = useAuth();

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
          <Redirect to="/login" />
        )}
      </Container>
      {topicVisible && <AddTopicModal />}
      {addChannelVisible && <CreateChannelModal />}
      {showUsersVisible && <ShowUsersModal />}
    </>
  );
};

export default HomePage;
