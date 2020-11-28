import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSubThreadRequest } from '@/store/modules/subThread';
import { Thread } from '@/types';
import styled from 'styled-components';

interface ThreadItemProps {
  thread: Thread;
}

const Container = styled.div`
  background-color: white;
  border: 1px solid black;
  &:hover {
    background-color: #f8f8f8;
  }
`;

const ThreadItem: React.FC<ThreadItemProps> = ({ thread }: ThreadItemProps) => {
  const dispatch = useDispatch();

  const replyClickEventHandler = (e: any) => {
    dispatch(getSubThreadRequest({ parentId: e.target.id }));
  };

  return (
    <Container>
      <div>{thread.userId}</div>
      <div>{thread.createdAt}</div>
      <div>{thread.content}</div>
      <button id={String(thread.id)} type="button" onClick={replyClickEventHandler}>
        {thread.subCount}replies
      </button>
      <div>{thread.subThreadId1}</div>
    </Container>
  );
};

export default ThreadItem;
