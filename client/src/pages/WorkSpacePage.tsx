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

const WorkSpacePage: React.FC = () => {
  const { accessToken } = useAuth();

  const { topicVisible, addChannelVisible, showUsersVisible } = useChannel();

  return (
    <>
      {accessToken ? (
        <>
          <Header />
          <Container>
            <LeftSideBar />
            <ThreadListBox />
            <DetailBox />
          </Container>
          {topicVisible && <AddTopicModal />}
          {addChannelVisible && <CreateChannelModal />}
          {showUsersVisible && <ShowUsersModal />}
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default WorkSpacePage;
