import React, { useRef } from 'react';
import styled from 'styled-components';
import { Thread } from '@/types';
import { ThreadItem } from '@/components';

const Container = styled.div``;

const Bottom = styled.div``;
interface SubThreadListProps {
  subThreadList: Thread[] | null;
}

const SubThreadList: React.FC<SubThreadListProps> = ({ subThreadList }: SubThreadListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  return (
    <Container>
      {subThreadList?.map((thread: Thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
      <Bottom ref={bottomRef} />
    </Container>
  );
};

export default SubThreadList;
