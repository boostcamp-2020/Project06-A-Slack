import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { Header, LeftSideBar, ThreadListBox, RightSideBar } from '@/components';
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
  const { channelId, rightSideType }: RightSideParams = useParams();
  const { accessToken } = useAuth();

  return (
    <>
      {accessToken ? (
        <>
          <Header />
          <Container>
            <LeftSideBar />
            <ThreadListBox />
            {rightSideType && <RightSideBar type={rightSideType} channelId={Number(channelId)} />}
          </Container>
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default WorkSpacePage;
