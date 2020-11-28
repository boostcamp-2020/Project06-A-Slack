import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getThreadRequest } from '@/store/modules/thread';
import styled from 'styled-components';
import { Thread } from '@/types';
import ThreadItem from '@/components/common/ThreadItem/ThreadItem';
import { useThread } from '@/hooks/useThread';

const Container = styled.div`
  background-color: orange;
`;

const ThreadList = () => {
  const { threadList } = useThread();
  const dispatch = useDispatch();
  const channelId = 1;

  useEffect(() => {
    dispatch(getThreadRequest({ channelId }));
  }, [dispatch]);

  return (
    <Container>
      <div>ThreadListTop</div>
      {threadList?.map((thread: Thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </Container>
  );
};

export default ThreadList;
