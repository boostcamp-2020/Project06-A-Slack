import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
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
import SubThreadListBox from '@/components/SubThreadListBox/SubThreadListBox';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100%;
`;

interface RightSideParams {
  channelId: string | undefined;
  rightSideType: string | undefined;
  threadId: string | undefined;
}

const WorkSpacePage: React.FC = () => {
  const { channelId, rightSideType, threadId }: RightSideParams = useParams();
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
            {rightSideType === 'detail' && <DetailBox />}
            {rightSideType === 'thread' && <SubThreadListBox />}
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
