import React from 'react';
import styled from 'styled-components';
import ThreadListHeader from './ThreadListHeader/ThreadListHeader';
import ThreadList from './ThreadList/ThreadList';
import ThreadInputBox from './ThreadInputBox/ThreadInputBox';

const Container = styled.div`
  background-color: pink;
  width: 100%;
`;

const ThreadListBox = () => {
  return (
    <Container>
      <ThreadListHeader />
      <ThreadList />
      <ThreadInputBox />
    </Container>
  );
};

export default ThreadListBox;
