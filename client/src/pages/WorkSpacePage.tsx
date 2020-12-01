import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useAuth, useChannel } from '@/hooks';
import {
  Header,
  LeftSideBar,
  ThreadListBox,
  DetailHeader,
  DetailBody,
  AddTopicModal,
  CreateChannelModal,
  ShowUsersModal,
  RightSideBar,
} from '@/components';
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

  return (
    <>
      {accessToken ? (
        <>
          <Header />
          <Container>
            <LeftSideBar />
            <ThreadListBox />
            {/* {detailVisible && <RightSideBar Header={DetailHeader} Body={DetailBody} />} */}
          </Container>
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default WorkSpacePage;
