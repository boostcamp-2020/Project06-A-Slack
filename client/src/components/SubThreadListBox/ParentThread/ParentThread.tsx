import React from 'react';
import styled from 'styled-components';
import { Thread } from '@/types';
import { ThreadItem } from '@/components';

const Container = styled.div`
  background-color: orange;
`;

interface parentThreadProps {
  parentThread: Thread;
}

const SubThreadList: React.FC<parentThreadProps> = ({ parentThread }: parentThreadProps) => {
  if (parentThread.isDeleted) {
    if (parentThread.subCount > 0) {
      const deletedThread = { ...parentThread, content: 'This message was deleted.' };
      return (
        <Container id={`thread-${parentThread.id}`} key={parentThread.id}>
          <ThreadItem key={parentThread.id} thread={deletedThread} isParentThreadOfRightSideBar />
        </Container>
      );
    }
  }

  return (
    <Container>
      <ThreadItem key={parentThread.id} thread={parentThread} isParentThreadOfRightSideBar />
    </Container>
  );
};

export default SubThreadList;
