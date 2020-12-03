import React from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useAuth, useUser, useChannel } from '@/hooks';
import { Header, LeftSideBar, ThreadListBox, RightSideBar } from '@/components';
import { isExistedChannel, isNumberTypeValue } from '@/utils/utils';

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
  const { userInfo } = useUser();
  const history = useHistory();
  const { myChannelList } = useChannel();

  // localshot:8080 접속시 연결될 채널을 안내
  if (channelId === undefined && userInfo !== null) {
    const url = `/client/1/${userInfo?.lastChannelId}`;
    return <Redirect to={url} />;
  }

  // 채널에 접근 불가능한 URL이 들어온 경우
  if (channelId !== undefined) {
    if (!isNumberTypeValue(channelId)) {
      // 숫자가 아닌 문자열이 들어오는 경우
      history.goBack();
    }
    if (myChannelList.length !== 0 && !isExistedChannel({ channelId: +channelId, myChannelList })) {
      // 가입 안 된 채널을 부르는 경우
      history.goBack();
    }
  }

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
