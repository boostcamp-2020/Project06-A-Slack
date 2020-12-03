import React from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
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

const checkValidOfRightSideType = (rightSideType: string | undefined) => {
  return (
    rightSideType === 'detail' || rightSideType === 'user_profile' || rightSideType === 'thread'
  );
};

const WorkSpacePage: React.FC = () => {
  const { channelId, rightSideType }: RightSideParams = useParams();
  const { accessToken } = useAuth();
  const history = useHistory();

  return (
    <>
      {accessToken ? (
        <>
          <Header />
          <Container>
            <LeftSideBar />
            <ThreadListBox />
            <>
              {rightSideType &&
                (checkValidOfRightSideType(rightSideType) ? (
                  <RightSideBar type={rightSideType} channelId={Number(channelId)} />
                ) : (
                  history.goBack()
                ))}
            </>
          </Container>
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default WorkSpacePage;
