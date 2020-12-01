import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getThreadRequest } from '@/store/modules/thread';
import styled from 'styled-components';
import { Thread } from '@/types';
import { ThreadItem } from '@/components/common/';
import { useThread } from '@/hooks';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  background-color: orange;
`;

interface RightSideParams {
  channelId: string | undefined;
}

const ThreadList = () => {
  const { channelId }: RightSideParams = useParams();
  const { threadList } = useThread();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getThreadRequest({ channelId: Number(channelId) }));
  }, [dispatch, channelId]);

  return (
    <Container>
      {threadList?.map((thread: Thread, index: number) => (
        <ThreadItem
          key={thread.id}
          thread={thread}
          prevThreadUserId={threadList[index - 1]?.userId}
        />
      ))}
    </Container>
  );
};

export default ThreadList;
