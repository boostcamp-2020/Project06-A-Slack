import React from 'react';
import styled from 'styled-components';
import { useSubThread } from '@/hooks';
import ParentThread from './ParentThread/ParentThread';
import SubThreadList from './SubThreadList/SubThreadList';
import ReplyCountHorizon from './ReplyCountHorizon/ReplyCountHorizon';

const Container = styled.div`
  background-color: green;
`;

const SubThreadListBox = () => {
  const { parentThread, subThreadList } = useSubThread();

  return (
    <Container>
      <div>subThreadListBox</div>
      <ParentThread parentThread={parentThread} isParentThreadOfRightSideBar />
      <ReplyCountHorizon subCount={parentThread.subCount} />
      <SubThreadList subThreadList={subThreadList} />
    </Container>
  );
};

export default SubThreadListBox;
