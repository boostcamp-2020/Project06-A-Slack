import React from 'react';
import styled from 'styled-components';
import { Thread } from '@/types';
import ThreadItem from '@/components/common/ThreadItem/ThreadItem';

const Container = styled.div`
  background-color: orange;
`;

interface parentThreadProps {
  parentThread: Thread;
  isParentThreadOfRightSideBar: boolean;
}

const SubThreadList: React.FC<parentThreadProps> = ({
  parentThread,
  isParentThreadOfRightSideBar,
}: parentThreadProps) => {
  return (
    <Container>
      <ThreadItem
        key={parentThread.id}
        thread={parentThread}
        isParentThreadOfRightSideBar={isParentThreadOfRightSideBar}
      />
    </Container>
  );
};

export default SubThreadList;
