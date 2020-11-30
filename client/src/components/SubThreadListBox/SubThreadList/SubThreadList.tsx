import React from 'react';
import styled from 'styled-components';
import { Thread } from '@/types';
import ThreadItem from '@/components/common/ThreadItem/ThreadItem';
import { useSubThread } from '@/hooks/useSubThread';

const Container = styled.div`
  background-color: pink;
`;

const SubThreadList = () => {
  const { subThreadList } = useSubThread();

  return (
    <Container>
      {subThreadList?.map((thread: Thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </Container>
  );
};

export default SubThreadList;
