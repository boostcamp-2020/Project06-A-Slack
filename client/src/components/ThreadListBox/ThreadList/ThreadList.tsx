import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTHREAD, getThreadRequest } from '@/store/modules/thread';
import styled from 'styled-components';
import { Thread } from '@/types';
import ThreadItem from './ThreadItem/ThreadItem';

const StyledThreadList = styled.div`
  background-color: orange;
`;

const ThreadList = () => {
  const { threadList } = useSelector(selectTHREAD);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getThreadRequest());
  }, [dispatch]);

  return (
    <StyledThreadList>
      <div>ThreadListTop</div>
      {threadList?.map((thread: Thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </StyledThreadList>
  );
};

export default ThreadList;
