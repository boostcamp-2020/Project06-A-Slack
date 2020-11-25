import React from 'react';
import { Thread } from '@/types';
import styled from 'styled-components';

interface ThreadItemProps {
  thread: Thread;
}

const StyledThreadItem = styled.div`
  background-color: white;
  &: hover {
    background-color: #f8f8f8;
  }
`;

const ThreadItem: React.FC<ThreadItemProps> = ({ thread }) => {
  return (
    <StyledThreadItem>
      ThreadItem
      <div>{thread.userId}</div>
      <div>{thread.content}</div>
      <div>{thread.createdAt}</div>
    </StyledThreadItem>
  );
};

export default ThreadItem;
