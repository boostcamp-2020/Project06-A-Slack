import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useUserState, useRedirectState } from '@/hooks';
import {
  Header,
  LeftSideBar,
  ThreadListBox,
  RightSideBar,
  SubThreadListBox,
  SubThreadListHeader,
  DetailHeader,
  DetailBody,
} from '@/components';
import { isExistedChannel, isNumberTypeValue } from '@/utils/utils';
import { socketConnectRequest, socketDisconnectRequest } from '@/store/modules/socket.slice';
import { getEmojiListRequest } from '@/store/modules/emoji.slice';
import { useDispatch } from 'react-redux';
import { setRedirect } from '@/store/modules/redirect.slice';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: calc(100% - 2.5rem);
`;

interface RightSideParams {
  channelId: string | undefined;
  rightSideType: 'detail' | 'user_profile' | 'thread' | undefined;
  threadId: string | undefined;
}

const WorkSpacePage: React.FC = () => {
  const { channelId, rightSideType, threadId }: RightSideParams = useParams();
  const { userInfo } = useUserState();
  const history = useHistory();
  const dispatch = useDispatch();
  const { url: redirectUrl } = useRedirectState();

  useEffect(() => {
    if (redirectUrl) {
      history.push(redirectUrl);
      dispatch(setRedirect({ url: null }));
    }
  }, [redirectUrl]);

  /* url에 채널 아이디가 없을 때, 최근에 접속한 채널로 이동 */
  useEffect(() => {
    if (!channelId && userInfo?.lastChannelId) {
      const url = `/client/1/${userInfo.lastChannelId}`;
      history.push(url);
    }
    /* TODO: 권한이 안맞는 채널 & 가입 안된 public으로 이동하는 경우를 처리 */
    // if (channelId) {
    //   if (myChannelList.length !== 0 && !isExistedChannel({ channelId: +channelId, myChannelList })) {
    //     // redirect 404?
    //   }
    // }
  }, [userInfo]);

  useEffect(() => {
    dispatch(socketConnectRequest());
    dispatch(getEmojiListRequest());
    return () => {
      dispatch(socketDisconnectRequest());
    };
  }, []);

  return (
    <>
      <Header />
      <Container>
        <LeftSideBar />
        <ThreadListBox />
        {rightSideType === 'thread' && channelId && threadId && (
          <RightSideBar
            url={`/client/1/${+channelId}`}
            header={<SubThreadListHeader />}
            body={<SubThreadListBox />}
          />
        )}
        {rightSideType === 'detail' && channelId && (
          <RightSideBar
            url={`/client/1/${+channelId}`}
            header={<DetailHeader />}
            body={<DetailBody />}
          />
        )}
      </Container>
    </>
  );
};

export default WorkSpacePage;
