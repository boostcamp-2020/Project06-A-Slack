import React from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import { INPUT_BOX_TYPE } from '@/utils/constants';
import { ThreadInputBox } from '@/components';
import ThreadListHeader from './ThreadListHeader/ThreadListHeader';
import ThreadList from './ThreadList/ThreadList';

const Container = styled.div`
  width: 100%;
  height: calc(100% - 2.5rem);
  background-color: gray;
  flex: 1;
  display: flex;
  flex-direction: column;
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
