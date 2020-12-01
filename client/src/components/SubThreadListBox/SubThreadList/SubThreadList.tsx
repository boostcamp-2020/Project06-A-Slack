import React from 'react';
import styled from 'styled-components';
import { Thread } from '@/types';
import { ThreadItem } from '@/components/common';

const Container = styled.div`
  background-color: pink;
`;

interface SubThreadListProps {
  subThreadList: Thread[] | null;
}

const SubThreadList: React.FC<SubThreadListProps> = ({ subThreadList }: SubThreadListProps) => {
  return (
    <Container>
      {subThreadList?.map((thread: Thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </Container>
  );
};

export default SubThreadList;
