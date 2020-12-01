import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getThreadRequest } from '@/store/modules/thread';
import styled from 'styled-components';
import { Thread } from '@/types';
import ThreadItem from '@/components/common/ThreadItem/ThreadItem';
import { useThread, useChannel } from '@/hooks';

const Container = styled.div`
  background-color: orange;
`;

const ThreadList = () => {
  const { current } = useChannel();
  const { threadList } = useThread();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getThreadRequest({ channelId: Number(current?.id) }));
  }, [dispatch, current]);

  return (
    <Container>
      <div>ThreadListTop{current?.id}</div>
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
