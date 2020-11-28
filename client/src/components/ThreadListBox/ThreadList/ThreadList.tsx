import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectThread, getThreadRequest } from '@/store/modules/thread';
import styled from 'styled-components';
import { Thread } from '@/types';
import ThreadItem from '@/components/common/ThreadItem/ThreadItem';

const Container = styled.div`
  background-color: orange;
`;

const ThreadList = () => {
  const { threadList } = useSelector(selectThread);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getThreadRequest());
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
