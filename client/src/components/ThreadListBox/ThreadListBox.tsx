import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { INPUT_BOX_TYPE } from '@/utils/constants';
import { ThreadInputBox } from '@/components';
import { loadChannelRequest } from '@/store/modules/channel.slice';
import { enterRoomRequest, leaveRoomRequest } from '@/store/modules/socket.slice';
import { useChannelState, useSocketState, useUserState } from '@/hooks';
import { isNumberTypeValue } from '@/utils/utils';
import { getThreadRequest } from '@/store/modules/thread.slice';
import ThreadList from './ThreadList/ThreadList';
import ThreadListHeader from './ThreadListHeader/ThreadListHeader';

const Container = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${(props) => props.theme.color.lightGray2};
`;

interface RightSideParams {
  channelId: string;
}

const ThreadListBox = () => {
  const { channelId }: RightSideParams = useParams();

  const dispatch = useDispatch();

  const { current } = useChannelState();
  const { userInfo } = useUserState();
  const { socket } = useSocketState();

  useEffect(() => {
    if (isNumberTypeValue(channelId)) {
      if (userInfo) {
        dispatch(loadChannelRequest({ channelId: +channelId, userId: userInfo.id }));
      }
    }
  }, [channelId, userInfo]);

  useEffect(() => {
    if (Number.isInteger(+channelId)) {
      dispatch(getThreadRequest({ channelId: +channelId }));
    }
  }, [channelId]);

  useEffect(() => {
    if (current && socket) {
      dispatch(enterRoomRequest({ room: current.name }));
    }
    return () => {
      if (current && socket) {
        dispatch(leaveRoomRequest({ room: current.name }));
      }
    };
  }, [current, socket]);

  return (
    <Container>
      <ThreadListHeader />
      <ThreadList />
      <ThreadInputBox inputBoxType={INPUT_BOX_TYPE.THREAD} />
    </Container>
  );
};

export default ThreadListBox;
