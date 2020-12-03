import React from 'react';
import styled from 'styled-components';
import { INPUT_BOX_TYPE } from '@/utils/constants';
import { ThreadInputBox } from '@/components/common';
import ThreadListHeader from './ThreadListHeader/ThreadListHeader';
import ThreadList from './ThreadList/ThreadList';

const Container = styled.div`
  background-color: pink;
  width: 100%;
`;

const ThreadListBox = () => {
  return (
    <Container>
      <ThreadListHeader />
      <ThreadList />
      <ThreadInputBox inputBoxType={INPUT_BOX_TYPE.THREAD} />
    </Container>
  );
};

export default ThreadListBox;
