import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSubThread, getSubThreadRequest } from '@/store/modules/subThread';
import styled from 'styled-components';
import { Thread } from '@/types';
import ThreadItem from '@/components/common/ThreadItem/ThreadItem';

const Container = styled.div`
  background-color: pink;
`;

const SubThreadList = () => {
  const { subThreadList } = useSelector(selectSubThread);

  return (
    <Container>
      <div> sub Thread1</div>
      <div> sub Thread2</div>
      {subThreadList?.map((thread: Thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </Container>
  );
};

export default SubThreadList;
