import React, { useEffect } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useAuthState, useUserState, useChannelState } from '@/hooks';
import { Header, LeftSideBar, ThreadListBox, RightSideBar } from '@/components';
import { isExistedChannel, isNumberTypeValue } from '@/utils/utils';
import { socketConnectRequest, socketDisconnectRequest } from '@/store/modules/socket.slice';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: calc(100% - 2.5rem);
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
  const { accessToken } = useAuthState();
  const { userInfo } = useUserState();
  const history = useHistory();
  const { myChannelList } = useChannelState();
  const dispatch = useDispatch();

  // localshot:8080 접속시 연결될 채널을 안내
  // if (channelId === undefined && userInfo !== null) {
  //   const url = `/client/1/${userInfo?.lastChannelId}`;
  //   return <Redirect to={url} />;
  // }

  // // 채널에 접근 불가능한 URL이 들어온 경우
  // if (channelId !== undefined) {
  //   if (!isNumberTypeValue(channelId)) {
  //     // 숫자가 아닌 문자열이 들어오는 경우
  //     history.goBack();
  //   }
  //   if (myChannelList.length !== 0 && !isExistedChannel({ channelId: +channelId, myChannelList })) {
  //     // 가입 안 된 채널을 부르는 경우
  //     history.goBack();
  //   }
  // }

  useEffect(() => {
    dispatch(socketConnectRequest());
    return () => {
      dispatch(socketDisconnectRequest());
    };
  }, []);

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
