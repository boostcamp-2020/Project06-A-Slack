import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Thread } from '@/types';
import ThreadItem from '@/components/common/ThreadItem/ThreadItem';
import { selectSubThread } from '@/hooks/useSubThread';

const Container = styled.div`
  background-color: pink;
`;

const SubThreadList = () => {
  const { subThreadList } = useSelector(selectSubThread);

  return (
    <Container>
      {subThreadList?.map((thread: Thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </Container>
  );
};

export default SubThreadList;
